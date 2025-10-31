import { ApiProperty } from '@nestjs/swagger';
import { ProjectDto } from './dto';

export class ProjectResponse {
    @ApiProperty({ description: 'Project details' })
    projects: ProjectDto[];

    constructor() {
        this.projects = [];
    }
}