import { AppDto } from "../dto/flag";

export interface IFeatureFlagAdapter {
    listAppFlag(): Promise<AppDto[]>;
}