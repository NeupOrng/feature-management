import { Inject, Injectable } from "@nestjs/common";
import { AppDto, IFeatureFalgAdapter as IFeatureFlagAdapter } from "src/common";
import { FeatureFlagService } from "../services";

@Injectable()
export class FeatureFlagAdapter implements IFeatureFlagAdapter {

    constructor(private readonly featureFlagService: FeatureFlagService) {}
    async listAppFlag(): Promise<AppDto[]> {
        // Implementation logic to fetch and return application flags
        return [];
    }
}