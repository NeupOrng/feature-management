import { ApiProperty } from "@nestjs/swagger";

export class FeatureFlagDto {
    @ApiProperty({ description: 'Unique identifier for the feature flag', example: '770e8400-e29b-41d4-a716-446655440000' })
    flagId: string;

    @ApiProperty({ description: 'Identifier of the application this feature flag belongs to', example: '660e8400-e29b-41d4-a716-446655440000' })
    appId: string;

    @ApiProperty({ description: 'Name of the feature flag', example: 'New Dashboard' })
    name: string;

    @ApiProperty({ description: 'Key of the feature flag', example: 'new_dashboard' })
    key: string;

    @ApiProperty({ description: 'Description of the feature flag', example: 'Enables the new dashboard for users.', required: false })
    description?: string;

    @ApiProperty({ description: 'Indicates whether the feature flag is enabled', example: true })
    isEnabled: boolean;

    @ApiProperty({ description: 'Status of the feature flag', example: 'active' })
    status: string;

    @ApiProperty({ description: 'Timestamp when the feature flag was created', example: '2023-10-01T12:00:00Z' })
    createdAt: Date;

    @ApiProperty({ description: 'Timestamp when the feature flag was last updated', example: '2023-10-02T15:30:00Z' })
    updatedAt: Date;

    set dataFromEntity(entity: any) {
        Object.assign(this, entity);
    }
}