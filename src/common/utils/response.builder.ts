// src/common/utils/response.builder.ts
import { HttpStatus } from '@nestjs/common';
import { ResponseDto } from '../dto/response.dto';

export class ResponseBuilder {
    // Updated response
    static updated<T>(
        data: T,
        message: string = 'Resource updated successfully',
        statusCode: HttpStatus = HttpStatus.OK,
    ): ResponseDto<T> {
        return {
            status: {
                code: 'updated',
                message,
            },
            data,
        };
    }


    // Created response
    static created<T>(
        data: T,
        message: string = 'Resource created successfully',
        statusCode: HttpStatus = HttpStatus.CREATED,
    ): ResponseDto<T> {
        return {
            status: {
                code: 'created',
                message,
            },
            data,
        };
    }


    // Success response
    static success<T>(
        data: T,
        message: string = 'Operation successful',
        statusCode: HttpStatus = HttpStatus.OK,
    ): ResponseDto<T> {
        return {
            status: {
                code: 'success',
                message,
            },
            data,
        };
    }

    // Error response
    static error(
        message: string = 'An error occurred',
        statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
        errors?: string[],
    ): ResponseDto<null> {
        return {
            status: {
                code: 'error',
                message,
                errors,
            },
            data: null,
        };
    }

    // Validation error response
    static validationError(
        errors: string[],
        message: string = 'Validation failed',
        statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    ): ResponseDto<null> {
        return {
            status: {
                code: 'validation_error',
                message,
                errors,
            },
            data: null,
        };
    }
}
