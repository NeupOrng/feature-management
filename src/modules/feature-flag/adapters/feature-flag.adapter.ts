import { Inject, Injectable } from '@nestjs/common';
import { AppDto, IFeatureFalgAdapter as IFeatureFlagAdapter } from 'src/common';
import {
    ApplicationRepository,
    FeatureFlagRepository,
    ProjectRepository,
} from '../repository';
import { Status } from 'src/modules/database/schema';
import { ProjDto } from 'src/common/dto/flag';

@Injectable()
export class FeatureFlagAdapter implements IFeatureFlagAdapter {
    constructor(
        private readonly projectRepository: ProjectRepository,
        private readonly applicationRepository: ApplicationRepository,
        private readonly featureFlagRepository: FeatureFlagRepository,
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
                    .map((flag) => ({
                        id: flag.flagId,
                        name: flag.name,
                        description: flag.description ?? '',
                        isEnabled: flag.enabled,
                        key: flag.key,
                    }));
                return appDto;
            });
            return projDto;
        });

    }
}
