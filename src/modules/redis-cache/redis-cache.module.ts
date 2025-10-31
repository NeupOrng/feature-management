// src/redis/redis.module.ts
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisCacheService } from './redis-cache.service';

export interface RedisModuleOptions {
    connectionOptions: RedisOptions;
    onClientReady?: (client: Redis) => void | Promise<void>;
}

@Global()
@Module({})
export class RedisCacheModule {
    static forRoot(options: RedisModuleOptions): DynamicModule {
        const provider: Provider = {
            provide: REDIS_CLIENT,
            useFactory: async () => {
                const client = new Redis(options.connectionOptions);
                await options.onClientReady?.(client);
                return client;
            },
        };

        return {
            module: RedisCacheModule,
            providers: [provider, RedisCacheService],
            exports: [REDIS_CLIENT, RedisCacheService],
        };
    }

    static forRootAsync({
        imports = [],
        useFactory,
        inject = [],
    }: {
        imports?: any[];
        useFactory: (
            ...args: any[]
        ) => RedisModuleOptions | Promise<RedisModuleOptions>;
        inject?: any[];
    }): DynamicModule {
        const optionsProvider = {
            provide: 'REDIS_MODULE_OPTIONS',
            useFactory,
            inject,
        };

        const clientProvider: Provider = {
            provide: REDIS_CLIENT,
            useFactory: async (opts: RedisModuleOptions) => {
                const client = new Redis(opts.connectionOptions);
                await opts.onClientReady?.(client);
                return client;
            },
            inject: ['REDIS_MODULE_OPTIONS'],
        };

        return {
            module: RedisCacheModule,
            imports,
            providers: [optionsProvider, clientProvider, RedisCacheService],
            exports: [REDIS_CLIENT, RedisCacheService],
        };
    }
}
