import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AdapterConstant } from 'src/common';
import { ApplicationSecretKeyMapping, applicationSecretKeyMapping, NewApplicationSecretKeyMapping } from 'src/modules/database/schema';

@Injectable()
export class ApplicationSecretKeyMappingRepository {
    constructor(
        @Inject(AdapterConstant.DRIZZLE_ORM) private readonly database: NodePgDatabase,
    ) {}

    findBySecretKey(secretKey: string): Promise<ApplicationSecretKeyMapping[]> {
        return this.database
            .select()
            .from(applicationSecretKeyMapping)
            .where(
                and(
                    eq(applicationSecretKeyMapping.secretKeyId, secretKey),
                    eq(applicationSecretKeyMapping.isActive, true),
                )
            );
    }

    async createMapping(payload: NewApplicationSecretKeyMapping): Promise<ApplicationSecretKeyMapping> {
        const [newMapping] = await this.database
            .insert(applicationSecretKeyMapping)
            .values(payload)
            .returning();
        return newMapping;
    }

    deactivateMappingById(mappingId: string): void {
        this.database
            .update(applicationSecretKeyMapping)
            .set({ isActive: false })
            .where(eq(applicationSecretKeyMapping.secretKeyId, mappingId));
    }
}
