import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exceptions.filter';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
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
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'Authorization',
        in: 'header',
        bearerFormat: 'Bearer',
      },
      'bearer', // Identify the controller who needs the bearer token
    )
    .build();

  const swaggerDocumentOptions: SwaggerDocumentOptions = {
    autoTagControllers: true,
  };

  const documentFactory = SwaggerModule.createDocument(
    app,
    config,
    swaggerDocumentOptions,
  );

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      security: [{ bearer: [] }],
      tagsSorter: 'alpha',
      operationsSorter: (a: any, b: any) => {
        const methodsOrder = {
          get: 1,
          post: 2,
          patch: 3,
          delete: 4,
        };

        // First sort by path (endpoint name)
        const pathDiff = a.get('path').localeCompare(b.get('path'));
        if (pathDiff !== 0) return pathDiff;

        // If same path(endpoint name), sort by http method
        return methodsOrder[a.get('method')] - methodsOrder[b.get('method')];
      },
    },
  };

  SwaggerModule.setup('api', app, documentFactory, swaggerCustomOptions);

  await app.listen(3000);
}
bootstrap();
