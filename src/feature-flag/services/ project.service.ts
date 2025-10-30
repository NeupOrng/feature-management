import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../repository/project.repository';
import { NewProject, Status } from 'src/database/schema';
import { ProjectResponse } from '../models/project/response';
import { ResponseBuilder, ResponseDto } from 'src/common';
import { ProjectDto } from '../models/project/dto';
import { CreateProjectRequest } from '../models/project/request';

@Injectable()
export class ProjectService {
    constructor(private readonly projectRepository: ProjectRepository) {}

    async getProjects(): Promise<
        ResponseDto<ProjectResponse> | ResponseDto<null>
    > {
        try {
            const listProject =
                await this.projectRepository.findProjectByStatus(Status.Active);
            const projectResponse = new ProjectResponse();
            projectResponse.projects = listProject.map((project) => {
                const dto = new ProjectDto();
                dto.dataFromEntity = project;
                return dto;
            });
            return ResponseBuilder.success<ProjectResponse>(
                projectResponse,
                'Projects retrieved successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to retrieve projects');
        }
    }

    async createProject(
        requestBody: CreateProjectRequest,
    ): Promise<ResponseDto<ProjectResponse> | ResponseDto<null>> {
        try {
            const createPayload: NewProject = {
                name: requestBody.name,
                description: requestBody.description,
                status: Status.Active,
            };
            const newProject =
                await this.projectRepository.createProject(createPayload);

            const projectDto = new ProjectDto();
            projectDto.dataFromEntity = newProject;

            const projectResponse = new ProjectResponse();
            projectResponse.projects = [projectDto];
            return ResponseBuilder.created<ProjectResponse>(
                projectResponse,
                'Project created successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to create project');
        }
    }

    async updateProject(
        id: string,
        requestBody: CreateProjectRequest,
    ): Promise<ResponseDto<ProjectResponse> | ResponseDto<null>> {
        try {
            const updatePayload: NewProject = {
                name: requestBody.name,
                description: requestBody.description,
                status: Status.Active,
            };
            const updatedProject = await this.projectRepository.updateProject(
                id,
                updatePayload,
            );

            const projectDto = new ProjectDto();
            projectDto.dataFromEntity = updatedProject;

            const projectResponse = new ProjectResponse();
            projectResponse.projects = [projectDto];

            return ResponseBuilder.updated<ProjectResponse>(
                projectResponse,
                'Project updated successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to update project');
        }
    }

    async deleteProject(id: string): Promise<ResponseDto<null>> {
        try {
            await this.projectRepository.deleteProject(id);
            return ResponseBuilder.updated<null>(
                null,
                'Project deleted successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to delete project');
        }
    }
}
