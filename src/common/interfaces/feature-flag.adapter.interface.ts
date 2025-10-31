import { AppDto, ProjDto } from "../dto/flag";

export interface IFeatureFlagAdapter {
    listAppFlag(): Promise<ProjDto[]>;
    findAppBySecretKey(secretKey: string): Promise<AppDto | null>;
}