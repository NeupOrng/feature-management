import { BadRequestException, Inject, Injectable, Logger, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AdapterConstant, AppDto } from "src/common";
import { IFeatureFalgAdapter } from "src/common";
import { RedisCacheService } from "src/modules/redis-cache";
import { GetFlagConfigRequest } from "../models/flag-confg/request";
import { NewEntity } from "src/modules/database/schema";

@Injectable()
export class EngineService implements OnModuleInit {
    private readonly logger = new Logger(EngineService.name);    

    constructor(
        @Inject(AdapterConstant.FEATURE_FLAG_ADAPTER)
        private readonly featureFlagAdapter: IFeatureFalgAdapter,
        public readonly redisCacheService: RedisCacheService
    ) {}

    async onModuleInit() {
        await this.cachingFlags();
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async cachingFlags(): Promise<void> {
        this.logger.log("Running cron job to save feature flags...");
        await this.saveFeatureFlags();
        this.logger.log("Feature flags saved successfully.");
    }

    async saveFeatureFlags(): Promise<void> {
        const projFlags = await this.featureFlagAdapter.listAppFlag();
        this.logger.log(`total projFlags: ${projFlags}`);
        for(const projFlag of projFlags) {
           for(const appFlag of projFlag.applications) {
                for(const flag of appFlag.flags) {
                    const cacheKey = `feature_flags:proj_${projFlag.id}:app_${appFlag.id}:flag-key_${flag.key}`;
                    this.logger.log(`Setting cache key: ${cacheKey} with value: ${JSON.stringify(flag)}`);
                    await this.redisCacheService.set(cacheKey, JSON.stringify(flag));
                    const result = await this.redisCacheService.get(cacheKey);
                    this.logger.log(`Cache key: ${cacheKey}: ${result} set successfully`);
                }
           }
        }
    }

    async getFlagConfig(secretKey: string, payload: GetFlagConfigRequest) {
        const application = await this.findAppBySecretKey(secretKey);
        if(!application) {
            throw new UnauthorizedException('Application Not Found');
        }
        const featureFlags = await this.checkKeyConfig(payload, application);

        const newEntity: NewEntity = {
            applicationId: application.id,
            idendifierId: payload.idendifierId,
            role: payload.role,
            version: payload.version,
            customContext: payload.customContext,
            userFeatureFlag: featureFlags,
        }
        const entity = await this.featureFlagAdapter.upsertEntity(newEntity);
        return {
            featureFlags,
            entity
        };
    }

    async findAppBySecretKey(secretKey: string): Promise<AppDto | null> {
        this.logger.log('retriving data: ', secretKey)
        return this.featureFlagAdapter.findAppBySecretKey(secretKey);
    }

    private async checkKeyConfig(payload: GetFlagConfigRequest, application: AppDto) {
        const { idendifierId, role, version, customContext } = payload;
        if(!idendifierId || !role) {
            throw new BadRequestException('Identifier ID and Role are required');
        }
        const flags = application.flags.map((flag) => ({
            key: flag.key,
            isEnabled: flag.isEnabled,
        }));
        const result = {};
        flags.forEach((flags) => {
            result[flags.key] = flags.isEnabled;
        });
        return result;
    }
}