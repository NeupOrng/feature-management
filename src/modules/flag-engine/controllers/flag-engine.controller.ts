import {
    Body,
    Controller,
    Headers,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import { EngineService } from '../services/engine.service';
import { GetFlagConfigRequest } from '../models/flag-confg/request';

@Controller('')
export class FlagEngineController {
    constructor(private readonly flagEngineService: EngineService) {}

    @Post('/flag-config')
    async getFlagConfig(
        @Body() requestBody: GetFlagConfigRequest,
        @Headers('X-Application-Key') secretKey: string,
    ) {
        if (!secretKey) {
            throw new UnauthorizedException('Application Key is not found');
        }
        return this.flagEngineService.getFlagConfig(secretKey, requestBody);
    }
}
