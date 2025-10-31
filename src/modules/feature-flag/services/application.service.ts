import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from '../repository';
import { ResponseDto, ResponseBuilder } from 'src/common';
import {
    ApplicationDto,
    CreateApplicationRequest,
    ApplicationResponse,
} from '../models/application';
import { NewApplication, Status, UpdateApplication } from 'src/modules/database/schema';

@Injectable()
export class ApplicationService {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
    ) {}

    async getApplicationsByProject(
        projectId: string,
    ): Promise<ResponseDto<ApplicationResponse> | ResponseDto<null>> {
        try {
            const applications =
                await this.applicationRepository.findByProjectId(projectId);
            const response = new ApplicationResponse();
            response.applications = applications.map((app) => {
                const dto = new ApplicationDto();
                dto.dataFromEntity = app;
                return dto;
            });
            return ResponseBuilder.success<ApplicationResponse>(
                response,
                'Applications retrieved successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to retrieve applications');
        }
    }

    async createApplication(
        projectId: string,
        requestBody: CreateApplicationRequest,
    ): Promise<ResponseDto<ApplicationResponse> | ResponseDto<null>> {
        try {
            const payload: NewApplication = {
                name: requestBody.name,
                description: requestBody.description,
                projectId: projectId,
                status: Status.Active,
            };
            const newApplication =
                await this.applicationRepository.createApplication(payload);
            const applicationDto = new ApplicationDto();
            applicationDto.dataFromEntity = newApplication;
            const applicationResponse = new ApplicationResponse();
            applicationResponse.applications = [applicationDto];
            return ResponseBuilder.created<ApplicationResponse>(
                applicationResponse,
                'Application created successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to create application');
        }
    }

    async updateApplication(
        applicationId: string,
        requestBody: CreateApplicationRequest,
    ): Promise<ResponseDto<ApplicationResponse> | ResponseDto<null>> {
        try {
            const payload: UpdateApplication = {
                name: requestBody.name,
                description: requestBody.description,
                status: Status.Active,
            };
            const updatedApplication =
                await this.applicationRepository.updateApplicationStatus(
                    applicationId,
                    payload,
                );
            const applicationDto = new ApplicationDto();
            applicationDto.dataFromEntity = updatedApplication;
            const applicationResponse = new ApplicationResponse();
            applicationResponse.applications = [applicationDto];
            return ResponseBuilder.success<ApplicationResponse>(
                applicationResponse,
                'Application updated successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to update application');
        }
    }

    async deleteApplication(applicationId: string): Promise<ResponseDto<null>> {
        try {
            await this.applicationRepository.deleteApplicationById(
                applicationId,
            );
            return ResponseBuilder.updated<null>(
                null,
                'Application deleted successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to delete application');
        }
    }
}
