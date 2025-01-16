import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PageMetaDto, PageOptionsDto } from '../dto/PageOptionsDto';
import { Response, PaginatedResponse } from '../types/response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T | PaginatedResponse<T>, Response<T | T[]>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T | T[]>> {
    return next.handle().pipe(
      map((result) => {
        const timestamp = new Date().toISOString();

        if (this.isPaginatedResponse(result)) {
          return {
            data: result.data,
            meta: {
              pagination: new PageMetaDto(result.pageOptionsDto, result.itemCount)
            },
            timestamp,
          };
        }

        return {
          data: result,
          timestamp,
        };
      }),
    );
  }

  /**
   * Check if the response send by the controller is paginated or not
   * @param data 
   * @returns boolean
   */
  private isPaginatedResponse(data: any): data is PaginatedResponse<T> {
    return (
      data !== null &&
      typeof data === 'object' &&
      Array.isArray(data.results) &&
      typeof data.itemCount === 'number' &&
      data.pageOptionsDto instanceof PageOptionsDto
    );
  }
}
