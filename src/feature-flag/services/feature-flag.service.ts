import { Injectable } from "@nestjs/common";
import { ProjectRepository, FeatureFlagRepository, ApplicationRepository } from '../repository';
import { ResponseDto } from "src/common/dto/response.dto";
import { FeatureFlagResponse } from "../models/feature-flag/response";
import { ResponseBuilder } from "src/common/utils/response.builder";
import { FeatureFlagDto } from "../models/feature-flag/dto";
import { CreateFeatureFlagRequest } from "../models/feature-flag/request";
import { NewFeatureFlag } from "src/database/schema";

@Injectable()
export class FeatureFlagService {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly featureFlagRepository: FeatureFlagRepository,
        private readonly applicationRepository: ApplicationRepository,
    ) {}
    
    async getFeatureFlagsByApplication(applicationId: string): Promise<ResponseDto<FeatureFlagResponse> | ResponseDto<null>> {
        try {
            const featureFlags = await this.featureFlagRepository.findFeatureFlagsByApplicationId(applicationId);
            const response = new FeatureFlagResponse();
            response.featureFlags = featureFlags.map((flag) => {
                const dto = new FeatureFlagDto();
                dto.dataFromEntity = flag;
                return dto;
            });
            return ResponseBuilder.success<FeatureFlagResponse>(
                response,
                'Feature flags retrieved successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to retrieve feature flags');
        }
    }

    async createFeatureFlag(applicationId: string, requestBody: CreateFeatureFlagRequest): Promise<ResponseDto<FeatureFlagResponse> | ResponseDto<null>> {
        try {
            const payload: NewFeatureFlag = {
                name: requestBody.name,
                description: requestBody.description,
                key: requestBody.key,
                enabled: requestBody.enabled,
                appId: applicationId,
            };
            const newFeatureFlag = await this.featureFlagRepository.createFeatureFlag(payload);
            const featureFlagDto = new FeatureFlagDto();
            featureFlagDto.dataFromEntity = newFeatureFlag;
            const featureFlagResponse = new FeatureFlagResponse();
            featureFlagResponse.featureFlags = [featureFlagDto];
            return ResponseBuilder.created<FeatureFlagResponse>(
                featureFlagResponse,
                'Feature flag created successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to create feature flag');
        }
    }

    async updateFeatureFlag(featureFlagId: string, requestBody: CreateFeatureFlagRequest): Promise<ResponseDto<FeatureFlagResponse> | ResponseDto<null>> {
        try {
            const payload: Partial<NewFeatureFlag> = {
                name: requestBody.name,
                description: requestBody.description,
                key: requestBody.key,
                enabled: requestBody.enabled,
            };
            const updatedFeatureFlag = await this.featureFlagRepository.updateFeatureFlag(featureFlagId, payload);
            const featureFlagDto = new FeatureFlagDto();
            featureFlagDto.dataFromEntity = updatedFeatureFlag;
            const featureFlagResponse = new FeatureFlagResponse();
            featureFlagResponse.featureFlags = [featureFlagDto];
            return ResponseBuilder.success<FeatureFlagResponse>(
                featureFlagResponse,
                'Feature flag updated successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to update feature flag');
        }
    }

    async deleteFeatureFlag(featureFlagId: string): Promise<ResponseDto<null>> {
        try {
            await this.featureFlagRepository.deleteFeatureFlagById(featureFlagId);
            return ResponseBuilder.updated(null,
                'Feature flag deleted successfully',
            );
        } catch (error) {
            return ResponseBuilder.error('Failed to delete feature flag');
        }
    }
}