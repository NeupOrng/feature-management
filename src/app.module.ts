import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './modules/database/database.module';
import { FeatureFlagModule } from './modules/feature-flag/feature-flag.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisCacheModule } from './modules/redis-cache';
import { FeatureFlagEngineModule } from './modules/flag-engine/flag-engine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    FeatureFlagModule,
    RedisCacheModule,
    ScheduleModule.forRoot(),
    FeatureFlagEngineModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
