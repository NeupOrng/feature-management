import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApplicationService } from '../services/application.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicationResponse } from '../models/application/response';
import { ResponseDto } from 'src/common/dto/response.dto';
import { CreateApplicationRequest } from '../models/application/request';

@Controller('/applications')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @Get('/:projectId')
    @ApiOperation({ summary: 'Get applications by project ID' })
    @ApiResponse({
        status: 200,
        description: 'List of applications for the specified project.',
        type: ResponseDto<ApplicationResponse>,
    })
    async getApplicationsByProject(
        @Param('projectId') projectId: string,
    ): Promise<ResponseDto<ApplicationResponse> | ResponseDto<null>> {
        return await this.applicationService.getApplicationsByProject(
            projectId,
        );
    }

    @Post('/:projectId')
    @ApiOperation({ summary: 'Create a new application under a project' })
    @ApiResponse({
        status: 201,
        description: 'The application has been successfully created.',
        type: ResponseDto<ApplicationResponse>,
    })
    async createApplication(
        @Param('projectId') projectId: string,
        @Body() requestBody: CreateApplicationRequest,
    ): Promise<ResponseDto<ApplicationResponse> | ResponseDto<null>> {
        return await this.applicationService.createApplication(
            projectId,
            requestBody,
        );
    }

    @Put('/:applicationId')
    @ApiOperation({ summary: 'Update an existing application' })
    @ApiResponse({
        status: 204,
        description: 'The application has been successfully updated.',
        type: ResponseDto<ApplicationResponse>,
    })
    async updateApplication(
        @Param('applicationId') applicationId: string,
        @Body() requestBody: CreateApplicationRequest,
    ): Promise<ResponseDto<ApplicationResponse> | ResponseDto<null>> {
        return await this.applicationService.updateApplication(
            applicationId,
            requestBody,
        );
    }

    @Delete('/:applicationId')
    @ApiOperation({ summary: 'Delete an existing application' })
    @ApiResponse({
        status: 204,
        description: 'The application has been successfully deleted.',
        type: ResponseDto<null>,
    })
    async deleteApplication(
        @Param('applicationId') applicationId: string,
    ): Promise<ResponseDto<null>> {
        return await this.applicationService.deleteApplication(applicationId);
    }
}
