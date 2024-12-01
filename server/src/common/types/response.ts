import { PageMetaDto, PageOptionsDto } from '../dto/PageOptionsDto';

// Used for sending back a single object
export interface Response<T> {
  data: T;
  meta?: PageMetaDto;
}

// Used for sending back multiples objects
export interface PaginatedResult<T> {
  results: T[];
  itemCount: number;
  pageOptionsDto: PageOptionsDto;
}
