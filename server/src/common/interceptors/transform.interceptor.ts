import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageMetaDto } from '../dto/PageOptionsDto';
import { PaginatedResult, Response } from '../types/response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // Use type guard to check if response is paginated
        if (this.isPaginatedResult(data)) {
          const { results, pageOptionsDto, itemCount } = data;
          return {
            data: results,
            meta: new PageMetaDto(pageOptionsDto, itemCount),
            success: true,
            timestamp: new Date().toISOString(),
          };
        }

        // Handle null/undefined data
        if (data === null || data === undefined) {
          return {
            data: null,
            success: true,
            timestamp: new Date().toISOString(),
          };
        }

        // Standard response
        return {
          data,
          success: true,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }

  private isPaginatedResult(data: unknown): data is PaginatedResult<T> {
    return (
      data !== null &&
      typeof data === 'object' &&
      'results' in data &&
      'pageOptionsDto' in data &&
      'itemCount' in data &&
      Array.isArray((data as PaginatedResult<T>).results)
    );
  }
}
