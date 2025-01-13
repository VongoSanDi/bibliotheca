/**
 * Metadatas send by the server
 */
export interface PageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

/**
 * Response type send by the server
 */
export interface ApiResponse<T> {
  data: T,
  meta?: {
    pagination: PageMeta,
    timestamp: string
  }
}

/**
 * Pagination params
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  order?: 'ASC | DESC';
}
