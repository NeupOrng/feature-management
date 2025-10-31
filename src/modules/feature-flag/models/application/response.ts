import { ApiProperty } from "@nestjs/swagger";
import { ApplicationDto } from "./dto";


export class ApplicationResponse {
    @ApiProperty({ type: [ApplicationDto], description: 'List of applications' })
    applications: ApplicationDto[];
}