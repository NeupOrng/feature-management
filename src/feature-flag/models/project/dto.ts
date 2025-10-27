import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/database/schema';

export class ProjectDto {
    @ApiProperty({ description: 'Unique identifier for the project', example: '550e8400-e29b-41d4-a716-446655440000' })
    id: string;

    @ApiProperty({ description: 'Name of the project', example: 'My Project' })
    name: string;

    @ApiProperty({ description: 'Description of the project', example: 'This is a sample project.' })
    description?: string;

    @ApiProperty({ description: 'Status of the project', example: 'active' })
    status: string;

    @ApiProperty({ description: 'Timestamp when the project was created', example: '2023-10-01T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the project was last updated', example: '2023-10-02T15:30:00Z' })
    updatedAt: Date;

    set dataFromEntity(entity: Project) {
        Object.assign(this, entity);
    }
}