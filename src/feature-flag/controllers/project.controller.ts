import { Controller, Get } from "@nestjs/common";
import { ProjectService } from "../services/ project.service";


@Controller('/project')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService
    ) {}

    @Get()
    async getAllProjec() {
        return await this.projectService.getProjects()
    }
}