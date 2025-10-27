import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectRequest {

    @ApiProperty({ description: 'Name of the project', example: 'New Feature Project' })
    name: string;

    @ApiProperty({ description: 'Description of the project', example: 'This project is for managing new features.', required: false })
    description?: string;
}