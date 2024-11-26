import { PageMetaDto, PageOptionsDto } from '../dto/PageOptionsDto';

export interface Response<T> {
  data: T;
  meta?: PageMetaDto;
}

export interface PaginatedResult<T> {
  results: T[];
  itemCount: number;
  pageOptionsDto: PageOptionsDto;
}
