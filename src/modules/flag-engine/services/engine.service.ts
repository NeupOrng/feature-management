import { Inject, Injectable, Logger, LoggerService, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AdapterConstant } from "src/common";
import { IFeatureFalgAdapter } from "src/common";
import { RedisCacheService } from "src/modules/redis-cache";

@Injectable()
export class EngineService implements OnModuleInit {
    private readonly logger = new Logger(EngineService.name);    

    constructor(
        @Inject(AdapterConstant.FEATURE_FLAG_ADAPTER)
        private readonly featureFlagAdapter: IFeatureFalgAdapter,
        private readonly redisCacheService: RedisCacheService
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
}