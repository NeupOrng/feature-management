import { CacheModuleOptions } from "@nestjs/cache-manager";
import * as redisStore from 'cache-manager-redis-store';
import { ConfigService } from "@nestjs/config";

export const redisCacheOptions = (config: ConfigService): CacheModuleOptions => ({
    store: redisStore,
    host: config.get<string>('REDIS_HOST', 'localhost'),
    port: config.get<number>('REDIS_PORT', 6379),
    password: config.get<string>('REDIS_PASSWORD', ''),
    db: config.get<number>('REDIS_DB', 0),
    ttl: 600, // seconds
});