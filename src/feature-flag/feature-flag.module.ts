import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ProjectRepository, FeatureFlagRepository, ApplicationRepository } from './repository';
import { ProjectService, ApplicationService, FeatureFlagService } from './services';
import { FeatureFlagController, ProjectController, ApplicationController } from './controllers';
import { FeatureFlagAdapter } from './adapters/feature-flag.adapter';
import { AdapterConstant } from 'src/common';


@Module({
    imports: [
        DatabaseModule,
    ],
    providers: [
        ProjectRepository,
        ProjectService,

        ApplicationRepository,
        ApplicationService,

        FeatureFlagRepository,
        FeatureFlagService,

        {
        provide: AdapterConstant.FEATURE_FLAG_ADAPTER,
        useClass: FeatureFlagAdapter,
        }
    ],
    controllers: [
        ProjectController,
        ApplicationController,
        FeatureFlagController,
    ],
    exports: [AdapterConstant.FEATURE_FLAG_ADAPTER]
})
export class FeatureFlagModule {}
