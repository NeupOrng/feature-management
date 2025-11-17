// src/redis/redis.service.ts
import {
    Injectable,
    Inject,
    OnModuleDestroy,
    Logger,
    OnModuleInit,
} from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisCacheService {
    private readonly logger = new Logger(RedisCacheService.name);

    constructor(private readonly redisService: RedisService) {}

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        const client = this.redisService.getOrThrow(); // Gets the ioredis instance
        if (ttlSeconds) {
          await client.set(key, value, 'EX', ttlSeconds);
        } else {
          await client.set(key, value);
        }
      }
    
      async get(key: string): Promise<string | null> {
        const client = this.redisService.getOrThrow();
        return client.get(key);
      }
    
      async del(key: string): Promise<number> {
        const client = this.redisService.getOrThrow();
        return client.del(key);
      }
}
