import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import {
    Application,
    applications,
    NewApplication,
    Status,
} from 'src/database/schema';
import { UpdateApplication } from 'src/database/schema/types';

@Injectable()
export class ApplicationRepository {
    constructor(@Inject('DRIZZLE_ORM') private database: NodePgDatabase) {}

    findByProjectId(projectId: string) {
        return this.database
            .select()
            .from(applications)
            .where(
                and(
                    eq(applications.projectId, projectId),
                    eq(applications.status, Status.Active),
                ),
            );
    }

    async createApplication(payload: NewApplication) {
        const [newApplication] = await this.database
            .insert(applications)
            .values(payload)
            .returning();
        return newApplication;
    }

    async updateApplicationStatus(
        applicationId: string,
        payload: UpdateApplication,
    ): Promise<Application> {
        const [app] = await this.database
            .update(applications)
            .set(payload)
            .where(eq(applications.appId, applicationId))
            .returning();
        return app;
    }

    async deleteApplicationById(applicationId: string): Promise<void> {
        await this.database
            .delete(applications)
            .where(eq(applications.appId, applicationId));
    }
}
