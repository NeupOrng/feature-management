import { ProjDto } from "../dto/flag";

export interface IFeatureFlagAdapter {
    listAppFlag(): Promise<ProjDto[]>;
}