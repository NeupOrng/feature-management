import { Entity, NewEntity } from "src/modules/database/schema";
import { AppDto, ProjDto } from "../dto/flag";

export interface IFeatureFlagAdapter {
    listAppFlag(): Promise<ProjDto[]>;
    findAppBySecretKey(secretKey: string): Promise<AppDto | null>;
    upsertEntity(entity: NewEntity): Promise<Entity>;
}