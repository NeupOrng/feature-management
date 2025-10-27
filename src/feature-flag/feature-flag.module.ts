import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectRepository } from './repository/project.repository';
import { FeatureFlagService } from './services/feature-flag.service';
import { FeatureFlagController } from './controllers/feature-flag.controller';
import { ProjectService } from './services/ project.service';
import { ProjectController } from './controllers/project.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        ProjectRepository,
        ProjectService,

        FeatureFlagService,
    ],
    controllers: [
        ProjectController,
        FeatureFlagController,
    ]
})
export class FeatureFlagModule {}
