import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exceptions.filter';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  app.enableCors({ credentials: true });
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapter, configService));
  app.useGlobalInterceptors(new TransformInterceptor());

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

        const pathA = a.get('path');
        const pathB = b.get('path');
        const methodA = a.get('method');
        const methodB = b.get('method');

        // Si les deux sont des GET, on trie par profondeur puis alphabétiquement
        if (methodA === 'get' && methodB === 'get') {
          // Compte le nombre de segments dans le chemin
          const depthA = pathA.split('/').length;
          const depthB = pathB.split('/').length;

          // Si la profondeur est différente, trie par profondeur
          if (depthA !== depthB) {
            return depthA - depthB;
          }

          // Si même profondeur, trie alphabétiquement
          return pathA.localeCompare(pathB);
        }

        // Si l'un est GET et l'autre non, GET vient en premier
        if (methodA === 'get' && methodB !== 'get') return -1;
        if (methodA !== 'get' && methodB === 'get') return 1;

        // Si aucun n'est GET, on utilise l'ordre des méthodes
        if (methodA !== methodB) {
          return methodsOrder[methodA] - methodsOrder[methodB];
        }

        // En dernier recours, trie par chemin
        return pathA.localeCompare(pathB);
      },
    },
  };

  SwaggerModule.setup('api', app, documentFactory, swaggerCustomOptions);

  await app.listen(3000);
}
bootstrap();
