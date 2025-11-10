import { RedisCacheService } from '../redis-cache.service';
export type CacheKeyGenerator = (...args: any[]) => string;
export type CacheKey = string | CacheKeyGenerator;
export const CACHE_METADATA = 'cache:metadata';

interface CacheMetadata {
    key: string;
    ttl?: number;
}

export const CustomCache = (key: CacheKey, ttl?: number): MethodDecorator => {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        // Store metadata
        Reflect.defineMetadata(
            CACHE_METADATA,
            { key, ttl },
            target,
            propertyKey,
        );
        const originalMethod = descriptor.value;
        // Replace the method with a cached version
        descriptor.value = async function (...args: any[]) {
            const redis: RedisCacheService = (this as any).redisCacheService;

            if (!redis) {
                throw new Error(
                    `RedisCacheService not injected in ${target.constructor.name}`,
                );
            }

            const metadata: CacheMetadata = Reflect.getMetadata(
                CACHE_METADATA,
                target,
                propertyKey,
            );

            if (!metadata) return originalMethod.apply(this, args);
            console.log('metadata', metadata);
            const cacheKey: string =
                typeof key === 'function' ? key(...args) : key;

            // 1. Try cache
            const cached = await redis.get<string>(cacheKey);
            if (cached !== null) {
                try {
                    return JSON.parse(cached);
                } catch {
                    // fall through if JSON is corrupt
                }
            }

            // 2. Cache miss → run original method
            const result = await originalMethod.apply(this, args);

            // 3. Store in cache
            try {
                const serialized = JSON.stringify(result);
                await redis.set(cacheKey, serialized, metadata.ttl);
            } catch (err) {
                console.warn('Failed to cache result', err);
            }

            return result;
        };

        return descriptor;
    };
};
