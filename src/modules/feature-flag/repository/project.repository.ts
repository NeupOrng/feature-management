import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AdapterConstant } from 'src/common';
import { NewProject, projects, StatusType } from 'src/modules/database/schema';

@Injectable()
export class ProjectRepository {
    constructor(@Inject(AdapterConstant.DRIZZLE_ORM) private database: NodePgDatabase) {}

    async findProjectById(id: string) {
        const [project] = await this.database
            .select()
            .from(projects)
            .where(eq(projects.projectId, id))
            .limit(1);
        return project;
    }

    findProjectByStatus(status: StatusType) {
        return this.database
            .select()
            .from(projects)
            .where(eq(projects.status, status));
    }

    async createProject(data: NewProject) {
        const [newProject] = await this.database
            .insert(projects)
            .values(data)
            .returning();
        return newProject;
    }

    async updateProject(id: string, data: NewProject) {
        const [updatedProject] = await this.database
            .update(projects)
            .set(data)
            .where(eq(projects.projectId, id))
            .returning();
        return updatedProject;
    }

    async deleteProject(id: string) {
        await this.database
            .delete(projects)
            .where(eq(projects.projectId, id));
    }
}
