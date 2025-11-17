// src/redis/redis.module.ts
import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import Redis, { RedisOptions } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';
import { RedisCacheService } from './redis-cache.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

export interface RedisModuleOptions {
    connectionOptions: RedisOptions;
    onClientReady?: (client: Redis) => void | Promise<void>;
}

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }), // Loads .env globally
        RedisModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                config: {
                    url: configService.get<string>('REDIS_URL'), // ioredis URL
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        RedisCacheService
    ],
    exports: [
        RedisCacheService
    ]
})
export class RedisCacheModule {
}
