import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';
import { FeatureFlag, featureFlags, NewFeatureFlag } from 'src/database/schema';

@Injectable()
export class FeatureFlagRepository {
    constructor(@Inject('DRIZZLE_ORM') private database: NodePgDatabase) {}

    async createFeatureFlag(payload: NewFeatureFlag): Promise<FeatureFlag> {
        const [newFeatureFlag] = await this.database
            .insert(featureFlags)
            .values(payload)
            .returning();
        return newFeatureFlag;
    }

    findFeatureFlagsByApplicationId(
        appId: string,
    ): Promise<FeatureFlag[]> {
        return this.database
            .select()
            .from(featureFlags)
            .where(eq(featureFlags.appId, appId));
    }

    async deleteFeatureFlagById(featureFlagId: string): Promise<void> {
        await this.database
            .delete(featureFlags)
            .where(eq(featureFlags.flagId, featureFlagId));
    }

    async updateFeatureFlag(
        featureFlagId: string,
        payload: Partial<NewFeatureFlag>,
    ): Promise<FeatureFlag> {
        const [updatedFlag] = await this.database
            .update(featureFlags)
            .set(payload)
            .where(eq(featureFlags.flagId, featureFlagId))
            .returning();
        return updatedFlag;
    }
}
