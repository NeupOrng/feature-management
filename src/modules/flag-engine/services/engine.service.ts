import { Inject, Injectable, Logger, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AdapterConstant, AppDto } from "src/common";
import { IFeatureFalgAdapter } from "src/common";
import { RedisCacheService, CustomCache } from "src/modules/redis-cache";
import { GetFlagConfigRequest } from "../models/flag-confg/request";

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
        const pong = await this.redisCacheService.client.ping();
        if(pong !== 'PONG') {
            this.logger.error("Redis is not connected properly.");
            return;
        }
        await this.saveFeatureFlags();
        this.logger.log("Feature flags saved successfully.");
    }

    async saveFeatureFlags(): Promise<void> {
        const projFlags = await this.featureFlagAdapter.listAppFlag();
        for(const projFlag of projFlags) {
           for(const appFlag of projFlag.applications) {
                for(const flag of appFlag.flags) {
                    const cacheKey = `feature_flags:proj_${projFlag.id}:app_${appFlag.id}:flag-key_${flag.key}`;
                    this.logger.log(`Setting cache key: ${cacheKey} with value: ${JSON.stringify(flag)}`);
                    await this.redisCacheService.set(cacheKey, JSON.stringify(flag));
                }
           }
        }
    }

    async getFlagConfig(secretKey: string, payload: GetFlagConfigRequest) {
        const application = await this.findAppBySecretKey(secretKey);
        if(!application) {
            throw new UnauthorizedException('Application Not Found');
        }
        return application;
    }

    @CustomCache((secretKey: string) => `application_mapping:${secretKey}`, 120)
    async findAppBySecretKey(secretKey: string): Promise<AppDto | null> {
        this.logger.log('retriving data: ', secretKey)
        return this.featureFlagAdapter.findAppBySecretKey(secretKey);
    }
}