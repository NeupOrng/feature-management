import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { projects } from "src/database/schema";

@Injectable()
export class ProjectRepository {
    constructor(
        @Inject('DRIZZLE_ORM') private database: NodePgDatabase,
    ) {}

    async findProjectById(id: string) {
        const [project] = await this.database.select().from(projects).where(eq(projects.projectId, id));
        return project;
    }

    findProjectByStatus(status: string) {
        return this.database.select().from(projects);
    }
}