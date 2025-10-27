// src/common/dto/response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
export class ResponseStatus {
    @ApiProperty({ description: 'Status of the response', example: 'error' })
    code: string;

    @ApiProperty({
        description: 'Error message',
        example: 'Something went wrong',
    })
    message: string;

    @ApiProperty({
        description: 'Error details',
        type: [String],
        required: false,
    })
    errors?: string[];
}
export class ResponseDto<T> {
    @ApiProperty({
        description: 'Status of the response',
        example: {
            code: 'success',
            message: 'Operation successful',
        },
    })
    status: ResponseStatus;

    @ApiProperty({
        description: 'Response data',
        type: () => Object,
        required: false, // Make data optional to avoid strict schema requirements
    })
    data: T;
}
