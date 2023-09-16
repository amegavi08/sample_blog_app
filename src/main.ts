import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global Prefix
  app.setGlobalPrefix('api/now');

  // Swagger implementation
  const config = new DocumentBuilder()
    .setTitle('The Blog Api Implementation in NestJs')
    .setDescription('The Blog is made easy here')
    .setVersion('3.0.3')
    .addTag('Crud operation for User and Post')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app , document);

  // Handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.port || 3000);
}
bootstrap();
