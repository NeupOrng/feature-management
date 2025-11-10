import { FeatureFlag } from "src/modules/database/schema";

export class FlagDto {
    id: string;
    name: string;
    key: string;
    description?: string;
    isEnabled: boolean;

    constructor() {
        this.id = '';
        this.name = '';
        this.key = '';
        this.isEnabled = false;
    }

    setValueFromFeatureFlag(config: FeatureFlag) {
        this.id = config.flagId;
        this.name = config.name;
        this.key = config.key;
        this.description = config.description ?? '';
        this.isEnabled = config.enabled;
    }
}

export class AppDto {
    id: string;
    name: string;
    description?: string;
    flags: FlagDto[];
}


export class ProjDto {
    id: string;
    name: string;
    description?: string;
    applications: AppDto[];
}