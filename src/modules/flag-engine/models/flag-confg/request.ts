// get-flag-config-request.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class GetFlagConfigRequest {
  @ApiProperty({
    description: 'Unique identifier for the entity (e.g. user ID, app ID)',
    example: 'user_123',
  })
  idendifierId: string;

  @ApiProperty({
    description: 'Role of the entity in the system',
    example: 'admin',
  })
  role: string;

  @ApiProperty({
    description: 'Version of the client or config',
    example: '1.0.0',
    required: false,
  })
  version?: string;

  @ApiProperty({
    description: 'Custom context data as key-value pairs',
    example: { country: 'US', device: 'mobile' },
    type: 'object',
    additionalProperties: true
  })
  customContext?: Record<string, any>;
}