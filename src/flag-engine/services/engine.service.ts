import { Inject, Injectable } from "@nestjs/common";
import { AdapterConstant } from "src/common";
import { FeatureFlagAdapter } from "src/feature-flag/adapters/feature-flag.adapter";

@Injectable()
export class EngineService {
    constructor(
        @Inject(AdapterConstant.FEATURE_FLAG_ADAPTER)
        private readonly featureFlagAdapter: FeatureFlagAdapter,
    ) {}

    executeFeatureFlagLogic(): string {
        return "Feature flag logic executed.";
    }
}