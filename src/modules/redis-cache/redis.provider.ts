import { Provider } from "@nestjs/common";
import { redisCacheOptions } from "./redis.options";
import { ConfigService } from "@nestjs/config";

export const RedisProviders: Provider[] = [
    {
        provide: 'REDIS_CACHE_MODULE_OPTIONS',
        useFactory: redisCacheOptions,
        inject: [ConfigService]
    }
];