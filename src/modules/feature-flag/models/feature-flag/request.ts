import { ApiProperty } from "@nestjs/swagger";

export class CreateFeatureFlagRequest {
    @ApiProperty({ description: 'Name of the feature flag', example: 'New Dashboard' })
    name: string;
    @ApiProperty({ description: 'Description of the feature flag', example: 'Enables the new dashboard for users.', required: false })
    description?: string;
    @ApiProperty({ description: 'Key of the feature flag', example: 'new_dashboard' })
    key: string;
    @ApiProperty({ description: 'Indicates whether the feature flag is enabled', example: true })
    enabled: boolean;
}