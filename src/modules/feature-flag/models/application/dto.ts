import { ApiProperty } from '@nestjs/swagger';
import { Application } from 'src/modules/database/schema';

export class ApplicationDto {
    @ApiProperty({ description: 'Unique identifier for the application', example: '660e8400-e29b-41d4-a716-446655440000' })
    appId: string;

    @ApiProperty({ description: 'Identifier of the project this application belongs to', example: '550e8400-e29b-41d4-a716-446655440000' })
    projectId: string;

    @ApiProperty({ description: 'Name of the application', example: 'My Application' })
    name: string;

    @ApiProperty({ description: 'Description of the application', example: 'This is a sample application.' })
    description?: string;

    @ApiProperty({ description: 'Timestamp when the application was created', example: '2023-10-01T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the application was last updated', example: '2023-10-02T15:30:00Z' })
    updatedAt: Date;

    set dataFromEntity(entity: Application) {
        Object.assign(this, entity);
    }
}