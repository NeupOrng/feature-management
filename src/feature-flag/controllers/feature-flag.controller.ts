import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { FeatureFlagService } from "../services/feature-flag.service";
import { ResponseDto } from "src/common/dto/response.dto";
import { FeatureFlagResponse } from "../models/feature-flag/response";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateFeatureFlagRequest } from "../models/feature-flag/request";


@Controller({
    path: '/feature-flag'
})
export class FeatureFlagController {

    constructor(
        private readonly featureFlagService: FeatureFlagService
    ) {}

    @Get('/:applicationId')
    @ApiOperation({ summary: 'Get feature flags by application ID' })
    @ApiResponse({
            status: 201,
            description: 'The application has been successfully created.',
            type: ResponseDto<FeatureFlagResponse>,
        })
    async getFeatureFlagsByApplication(
        @Param('applicationId') applicationId: string,
    ): Promise<ResponseDto<FeatureFlagResponse> | ResponseDto<null>> {
        return await this.featureFlagService.getFeatureFlagsByApplication(
            applicationId,
        );
    }

    @Post('/:applicationId')
    @ApiOperation({ summary: 'Create a new feature flag under an application' })
    @ApiResponse({
            status: 201,
            description: 'The feature flag has been successfully created.',
            type: ResponseDto<FeatureFlagResponse>,
        })
    async createFeatureFlag(
        @Param('applicationId') applicationId: string,
        @Body() requestBody: CreateFeatureFlagRequest
    ): Promise<ResponseDto<FeatureFlagResponse> | ResponseDto<null>> {
        return await this.featureFlagService.createFeatureFlag(
            applicationId,
            requestBody
        );
    }

    @Put('/:featureFlagId')
    @ApiOperation({ summary: 'Update an existing feature flag' })
    @ApiResponse({
            status: 204,
            description: 'The feature flag has been successfully updated.',
            type: ResponseDto<FeatureFlagResponse>,
        })
    async updateFeatureFlag(
        @Param('featureFlagId') featureFlagId: string,
        @Body() requestBody: CreateFeatureFlagRequest
    ): Promise<ResponseDto<FeatureFlagResponse> | ResponseDto<null>> {
        return await this.featureFlagService.updateFeatureFlag(
            featureFlagId,
            requestBody
        );
    }

    @Delete('/:featureFlagId')
    @ApiOperation({ summary: 'Delete an existing feature flag' })
    @ApiResponse({
            status: 204,
            description: 'The feature flag has been successfully deleted.',
            type: ResponseDto<null>,
        })
    async deleteFeatureFlag(
        @Param('featureFlagId') featureFlagId: string,
    ): Promise<ResponseDto<null>> {
        return await this.featureFlagService.deleteFeatureFlag(
            featureFlagId
        );
    }

}