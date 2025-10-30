import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { FeatureFlagModule } from './feature-flag/feature-flag.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    DatabaseModule,
    FeatureFlagModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
