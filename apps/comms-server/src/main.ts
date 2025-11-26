import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CommsServerModule } from './comms-server.module';

async function bootstrap() {
  const app = await NestFactory.create(CommsServerModule);

  const config = new DocumentBuilder()
    .setTitle('Comms Server API')
    .setDescription('API Playground for testing coms server APIs')
    .setVersion('1.0')
    .build();
  
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory) //  /api endpoint

  await app.listen(process.env.port ?? 3000);
  console.log(`Server started at ${process.env.HOST ?? '127.0.0.1'}:${process.env.port ?? 3000}/auth`)
  console.log(`Swagger started at ${process.env.HOST ?? '127.0.0.1'}:${process.env.port ?? 3000}/api`)
}
bootstrap();
