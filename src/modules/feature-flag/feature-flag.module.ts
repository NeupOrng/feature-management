import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/modules/database/database.module';
import {
    ProjectRepository,
    FeatureFlagRepository,
    ApplicationRepository,
    ApplicationSecretKeyMappingRepository,
} from './repository';
import {
    ProjectService,
    ApplicationService,
    FeatureFlagService,
} from './services';
import {
    FeatureFlagController,
    ProjectController,
    ApplicationController,
} from './controllers';
import { FeatureFlagAdapter } from './adapters/feature-flag.adapter';
import { AdapterConstant } from 'src/common';
import { EntityRepository } from './repository/entity.repository';

@Module({
    imports: [DatabaseModule],
    providers: [
        ProjectRepository,
        ProjectService,

        ApplicationRepository,
        ApplicationService,

        FeatureFlagRepository,
        FeatureFlagService,

        EntityRepository,

        ApplicationSecretKeyMappingRepository,

        {
            provide: AdapterConstant.FEATURE_FLAG_ADAPTER,
            useClass: FeatureFlagAdapter,
        },
    ],
    controllers: [
        ProjectController,
        ApplicationController,
        FeatureFlagController,
    ],
    exports: [AdapterConstant.FEATURE_FLAG_ADAPTER],
})
export class FeatureFlagModule {}
