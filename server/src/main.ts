import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exceptions.filter';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  app.enableCors({ credentials: true });
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Bibliotheca')
    .setDescription('Bibliotheca API documentation')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    autoTagControllers: true,
  };

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
