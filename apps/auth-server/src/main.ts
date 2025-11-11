import { NestFactory } from '@nestjs/core';
import { AuthServerModule } from './auth-server.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const config = new DocumentBuilder().setTitle('AuthServer').setDescription('API Playground for authentication services').addTag('auth').build()

  const app = await NestFactory.create(AuthServerModule);
  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, documentFactory)
  await app.listen(process.env.port ?? 3004);

}
bootstrap();
