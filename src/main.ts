import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Prefix
  app.setGlobalPrefix('api/now');
  // Handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
