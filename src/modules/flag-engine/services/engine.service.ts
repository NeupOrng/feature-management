import { Inject, Injectable, Logger, LoggerService, OnModuleInit } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { AdapterConstant } from "src/common";
import { IFeatureFalgAdapter } from "src/common";

@Injectable()
export class EngineService implements OnModuleInit {
    private readonly logger = new Logger(EngineService.name);    

    constructor(
        @Inject(AdapterConstant.FEATURE_FLAG_ADAPTER)
        private readonly featureFlagAdapter: IFeatureFalgAdapter,
    ) {}

    async onModuleInit() {
        await this.cronJob();
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async cronJob(): Promise<void> {
        this.logger.log("Running cron job to save feature flags...");
        await this.saveFeatureFlags();
        this.logger.log("Feature flags saved successfully.");
    }

    async saveFeatureFlags(): Promise<void> {
        const appFlags = await this.featureFlagAdapter.listAppFlag();
        // Logic to save feature flags into the engine
    }
}