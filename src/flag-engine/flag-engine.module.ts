import { Module } from '@nestjs/common';

@Module({
    imports: [
        FeatureFlagEngineModule,
    ],
    providers: [],
    controllers: [],
    exports: [
    ]
})
export class FeatureFlagEngineModule {}