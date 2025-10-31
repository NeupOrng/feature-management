import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: new ConsoleLogger({
            colors: true,
            timestamp: true,
            json: false
        })
    });
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.REDIS,
        options: {
            host: process.env.REDIS_HOST || 'localhost',
            port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
        },
    });

    const config = new DocumentBuilder()
        .setTitle('NestJS with Drizzle API')
        .setDescription(
            'API documentation for the Feature Management System using NestJS and Drizzle ORM',
        )
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
