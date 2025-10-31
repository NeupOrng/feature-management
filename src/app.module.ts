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
    RedisCacheModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        connectionOptions: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD'),
          db: config.get('REDIS_DB', 0),
        },
        onClientReady: (client) => {
          client.on('error', (err) => console.error('Redis error:', err));
        },
      }),
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    FeatureFlagEngineModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
