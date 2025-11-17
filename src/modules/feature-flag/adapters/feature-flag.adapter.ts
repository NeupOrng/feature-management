import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppDto, IFeatureFalgAdapter as IFeatureFlagAdapter } from 'src/common';
import {
    ApplicationRepository,
    ApplicationSecretKeyMappingRepository,
    FeatureFlagRepository,
    ProjectRepository,
} from '../repository';
import { Entity, NewEntity, Status } from 'src/modules/database/schema';
import { FlagDto, ProjDto } from 'src/common/dto/flag';
import { EntityRepository } from '../repository/entity.repository';

@Injectable()
export class FeatureFlagAdapter implements IFeatureFlagAdapter {

    private readonly logger = new Logger(FeatureFlagAdapter.name);    

    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly applicationRepository: ApplicationRepository,
        private readonly entityRepository: EntityRepository,
        private readonly featureFlagRepository: FeatureFlagRepository,
        private readonly applicationSecretKeyMappingRepository: ApplicationSecretKeyMappingRepository,
    ) {}
    async listAppFlag(): Promise<ProjDto[]> {
        const projects = await this.projectRepository.findProjectByStatus(
            Status.Active,
        );
        const apps = await this.applicationRepository.findByProjectIdsAndStatus(
            projects.map((proj) => proj.projectId),
            Status.Active,
        );
        const flags =
            await this.featureFlagRepository.findFeatureFlagsByApplicationIdsAndStatus(
                apps.map((app) => app.appId),
                Status.Active,
            );

        return projects.map((proj) => {
            const projDto: ProjDto = new ProjDto();
            projDto.id = proj.projectId;
            projDto.name = proj.name;
            projDto.description = proj.description ?? '';
            const projApps = apps.filter(
                (app) => app.projectId === proj.projectId,
            );
            projDto.applications = projApps.map((app) => {
                const appDto: AppDto = new AppDto();
                appDto.id = app.appId;
                appDto.name = app.name;
                appDto.description = app.description ?? '';
                appDto.flags = flags
                    .filter((flag) => flag.appId === app.appId)
                    .map((flag) => {
                        const flagDto = new FlagDto();
                        flagDto.setValueFromFeatureFlag(flag);
                        return flagDto;
                    });
                return appDto;
            });
            return projDto;
        });
    }

    async findAppBySecretKey(secretKey: string): Promise<AppDto | null> {
        const keyMapping =
            await this.applicationSecretKeyMappingRepository.findBySecretKey(
                secretKey,
            );
        if (keyMapping.length === 0) {
            return null;
        }
        const app =
            await this.applicationRepository.findByApplicationIdAndProjectId(
                keyMapping[0].appId,
                keyMapping[0].projectId,
            );

        if (app.length === 0) {
            return null;
        }

        const appDto: AppDto = new AppDto();
        appDto.id = app[0].appId;
        appDto.name = app[0].name;
        appDto.description = app[0].description ?? '';
        const flagConfigs =
            await this.featureFlagRepository.findFeatureFlagsByApplicationIdsAndStatus(
                [appDto.id],
                Status.Active,
            );
        const flagDtos = flagConfigs.map((config): FlagDto => {
            const flagDto = new FlagDto();
            flagDto.setValueFromFeatureFlag(config);
            return flagDto;
        });

        appDto.flags = flagDtos;
        this.logger.log("App: ", appDto)
        return appDto;
    }

    async upsertEntity(entity: NewEntity): Promise<Entity> {
        return this.entityRepository.upsert(entity);
    }
}
