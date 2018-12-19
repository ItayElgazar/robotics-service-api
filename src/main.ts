import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // api perfix starts from api/v1/endpoint
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
      disableErrorMessages: true,
  }));
  await app.listen(3000);
}
bootstrap();
