import { Inject, Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AdapterConstant } from 'src/common';
import {
    Application,
    applications,
    NewApplication,
    Status,
} from 'src/modules/database/schema';
import { UpdateApplication } from 'src/modules/database/schema/types';

@Injectable()
export class ApplicationRepository {
    constructor(@Inject(AdapterConstant.DRIZZLE_ORM) private database: NodePgDatabase) {}

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

    findByApplicationIdAndProjectId(applicationId: string, projectId: string) {
        return this.database
            .select()
            .from(applications)
            .where(
                and(
                    eq(applications.appId, applicationId),
                    eq(applications.projectId, projectId),
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

    async findByProjectIdsAndStatus(
        projectIds: string[],
        status: Status,
    ): Promise<Application[]> {
        return this.database
            .select()
            .from(applications)
            .where(
                and(
                    inArray(applications.projectId, projectIds),
                    eq(applications.status, status),
                ),
            );
    }
}
