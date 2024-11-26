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
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // if the data have pageOptionsDto & itemCount it's a paginated response
        if (data?.pageOptionsDto && data?.itemCount) {
          const { results, pageOptionsDto, itemCount } = data;
          return {
            data: results,
            meta: new PageMetaDto(pageOptionsDto, itemCount),
          };
        }
        // Else it's a simple response
        return { data };
      }),
    );
  }
  private isPaginatedResult(data: any): data is PaginatedResult<T> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'results' in data &&
      'pageOptionsDto' in data &&
      'itemCount' in data
    );
  }
}
