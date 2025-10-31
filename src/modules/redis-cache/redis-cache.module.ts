import { CacheModule } from '@nestjs/cache-manager';
import {
    DynamicModule,
    Global,
    Module,
    OnApplicationShutdown,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisCacheOptions } from './redis.options';
import { RedisCacheService } from './redis-cache.service';
import { RedisProviders } from './redis.provider';

@Global()
@Module({})
export class RedisCacheModule implements OnApplicationShutdown {
    static forRoot(): DynamicModule {
        return {
            module: RedisCacheModule,
            imports: [
                ConfigModule,
                CacheModule.registerAsync({
                    isGlobal: true,
                    imports: [ConfigModule],
                    useFactory: redisCacheOptions,
                    inject: [ConfigService],
                }),
            ],
            providers: [RedisCacheService, ...RedisProviders],
            exports: [RedisCacheService, CacheModule],
        };
    }

    async onApplicationShutdown() {
        const cacheManager = (global as any).cacheManager;
        if (cacheManager?.store?.getClient) {
            const client = cacheManager.store.getClient();
            if (client?.quit) await client.quit();
        }
    }
}
