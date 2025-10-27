import { Controller } from "@nestjs/common";
import { FeatureFlagService } from "../services/feature-flag.service";


@Controller({
    path: '/feature-flag'
})
export class FeatureFlagController {

    constructor(
        private readonly featureFlagService: FeatureFlagService
    ) {}
}