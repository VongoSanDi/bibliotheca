import { PageMetaDto, PageOptionsDto } from '../dto/PageOptionsDto';

// Used for sending back a single object
export interface Response<T> {
  data: T;
  meta?: {
    pagination?: PageMetaDto
  };
  timestamp: string;
}

// Used for sending back multiples objects
export interface PaginatedResponse<T> {
  data: T[];
  itemCount: number;
  pageOptionsDto: PageOptionsDto;
}
