import { Module } from '@nestjs/common';
import { RedisCacheModule } from '../redis-cache/redis-cache.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EngineService } from './services/engine.service';
import { FeatureFlagModule } from '../feature-flag/feature-flag.module';

@Module({
    imports: [
        FeatureFlagModule,
        RedisCacheModule,
        ScheduleModule
    ],
    providers: [
        EngineService
    ],
    controllers: [],
    exports: [
    ]
})
export class FeatureFlagEngineModule {}