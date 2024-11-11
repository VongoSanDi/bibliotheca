import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';
import { ApiError } from '../types/api-error';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    let responseBody: ApiError = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal server error',
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    // Get query params
    const queryParams = request.query;
    const bodyParams = request.body;
    const urlParams = request.params;

    // Common exceptions
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      responseBody = {
        ...responseBody,
        statusCode: exception.getStatus(),
        message:
          typeof exceptionResponse === 'object' &&
          'message' in exceptionResponse
            ? (exceptionResponse.message as string)
            : exception.message,
        error:
          typeof exceptionResponse === 'string'
            ? exception.name
            : (exceptionResponse as any).error,
        parameters: {
          query: queryParams,
          body: bodyParams,
          params: urlParams,
        },
      };
    }
    // Error from mariadb and typeorm
    else if (exception instanceof EntityNotFoundError) {
      responseBody = {
        ...responseBody,
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Entity not found',
        error: 'Not found',
        parameters: {
          query: queryParams,
          params: urlParams,
        },
      };
    }
    // SQL errors
    else if (exception instanceof QueryFailedError) {
      const sqlError = exception as any;
      responseBody = {
        ...responseBody,
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Database query failed',
        error: 'Query Failed',
        parameters: {
          column: sqlError.column,
          value: sqlError.value,
          constraint: sqlError.constraint,
          query: queryParams,
          body: bodyParams,
          params: urlParams,
        },
      };
    }
    //
    else if (exception instanceof Error) {
      responseBody.message = exception.message;
    }

    // Clean the sensible datas such as passwords
    if (responseBody.parameters?.body?.password) {
      responseBody.parameters.body.password = '***';
    }
    if (responseBody.parameters?.body?.password_hash) {
      responseBody.parameters.body.password_hash = '***';
    }

    // Logging
    this.logger.error({
      exception,
      path: request.url,
      method: request.method,
      body: request.body,
      // user: request.user, // TODO: A utiliser une fois l'authentification mis en place
      timestamp: responseBody.timestamp,
    });

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
