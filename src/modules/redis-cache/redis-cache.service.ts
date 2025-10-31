// src/redis/redis.service.ts
import {
    Injectable,
    Inject,
    OnModuleDestroy,
    Logger,
    OnModuleInit,
} from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisCacheService implements OnModuleDestroy, OnModuleInit {
    private readonly logger = new Logger(RedisCacheService.name);

    constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
        const serialized = JSON.stringify(value);
        if (ttlSeconds !== undefined) {
            await this.redis.set(key, serialized, 'EX', ttlSeconds);
        } else {
            await this.redis.set(key, serialized);
        }
        this.logger.verbose(`SET ${key}`);
    }

    async get<T>(key: string): Promise<T | null> {
        const raw = await this.redis.get(key);
        return raw ? JSON.parse(raw) : null;
    }

    get client(): Redis {
        return this.redis;
    }

    onModuleInit() {
        this.client
            .ping()
            .then(() => {
                this.logger.log('Redis client connected');
            })
            .catch((err) => this.logger.error('Redis error:', err));
    }

    onModuleDestroy() {
        this.logger.log('Disconnecting Redis...');
        this.redis.disconnect();
    }
}
