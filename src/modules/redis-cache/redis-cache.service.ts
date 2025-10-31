import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RedisCacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.cacheManager.set(key, JSON.stringify(value), ttl ?? undefined);
    }

    async get<T>(key: string): Promise<T | undefined> {
        const raw = await this.cacheManager.get<string>(key);
        return raw ? JSON.parse(raw) : undefined;
    }

    async del(key: string): Promise<void> {
        await this.cacheManager.del(key);
    }

    async reset(): Promise<void> {
        await this.cacheManager.clear();
    }
}