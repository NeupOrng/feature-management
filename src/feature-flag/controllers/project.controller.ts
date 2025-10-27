import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectService } from '../services/ project.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectResponse } from '../models/project/response';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateProjectRequest } from '../models/project/request';

@Controller('/projects')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    @ApiOperation({ summary: 'Get all project' })
    @ApiResponse({
        status: 200,
        description: 'List of all project.',
        type: [ResponseDto<ProjectResponse>],
    })
    async getAllProjec(): Promise<ResponseDto<ProjectResponse> | ResponseDto<null>> {
        return await this.projectService.getProjects();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new project' })
    @ApiResponse({
        status: 201,
        description: 'The project has been successfully created.',
        type: ResponseDto<ProjectResponse>,
    })
    async createProject(@Body() requsetBody: CreateProjectRequest): Promise<ResponseDto<ProjectResponse> | ResponseDto<null>> {
        // Implementation for creating a project goes here
        return await this.projectService.createProject(requsetBody);
    }

    @Put("/:id")
    @ApiOperation({ summary: 'Update an existing project' })
    @ApiResponse({
        status: 204,
        description: 'The project has been successfully updated.',
        type: ResponseDto<ProjectResponse>,
    })
    async updateProject(@Body() requestBody: CreateProjectRequest, @Param() id: string): Promise<ResponseDto<ProjectResponse> | ResponseDto<null>> {
        // Implementation for updating a project goes here
        return await this.projectService.updateProject(id, requestBody);
    }

    @Delete("/:id")
    @ApiOperation({ summary: 'Delete an existing project' })
    @ApiResponse({
        status: 204,
        description: 'The project has been successfully deleted.',
        type: ResponseDto<null>,
    })
    async deleteProject(@Param() id: string): Promise<ResponseDto<null>> {
        // Implementation for deleting a project goes here
        return await this.projectService.deleteProject(id);
    }
}
