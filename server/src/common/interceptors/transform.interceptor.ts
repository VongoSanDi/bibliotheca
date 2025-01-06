import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageMetaDto, PageOptionsDto } from '../dto/PageOptionsDto';
import { Response, PaginatedResult } from '../types/response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T | PaginatedResult<T>, Response<T | T[]>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T | T[]>> {
    return next.handle().pipe(
      map((data) => {
        const timestamp = new Date().toISOString();

        if (this.isPaginatedResult(data)) {
          return {
            data: data.results,
            meta: new PageMetaDto(data.pageOptionsDto, data.itemCount),
            timestamp,
          };
        }

        return {
          data,
          timestamp,
        };
      }),
    );
  }

  private isPaginatedResult(data: any): data is PaginatedResult<T> {
    return (
      data !== null &&
      typeof data === 'object' &&
      Array.isArray(data.results) &&
      typeof data.itemCount === 'number' &&
      data.pageOptionsDto instanceof PageOptionsDto
    );
  }
}
