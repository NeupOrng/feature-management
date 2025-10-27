import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectRepository } from './repository/project.repository';
import { FeatureFlagService } from './services/feature-flag.service';
import { FeatureFlagController } from './controllers/feature-flag.controller';
import { ProjectService } from './services/ project.service';
import { ProjectController } from './controllers/project.controller';
import { ApplicationService } from './services/application.service';
import { ApplicationRepository } from './repository/application.repository';
import { ApplicationController } from './controllers/application.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        ProjectRepository,
        ProjectService,

        ApplicationRepository,
        ApplicationService,

        FeatureFlagService,
    ],
    controllers: [
        ProjectController,
        ApplicationController,
        FeatureFlagController,
    ]
})
export class FeatureFlagModule {}
