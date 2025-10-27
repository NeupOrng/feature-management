import { ApiProperty } from "@nestjs/swagger";

export class CreateApplicationRequest {
    @ApiProperty({ description: 'Name of the application', example: 'My Application' })
    name: string;

    @ApiProperty({ description: 'Description of the application', example: 'This is a sample application.', required: false })
    description?: string;
}