import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RetrieveBookByIsbnDto {
  @ApiProperty()
  isbn: string;
}

export class RetrieveBookByFiltersDto {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  author_id?: number;
}

export class BookResponseDto {
  constructor(data: Partial<BookResponseDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  original_title: string;

  @ApiProperty()
  original_language_id: number;

  @ApiProperty()
  book_number: number;

  @ApiProperty()
  serie_id: number;

  @ApiProperty()
  type_id: number;

  @ApiProperty()
  author_id: number;

  @ApiProperty()
  publisher_id: number;

  @ApiProperty()
  edition_id: number;

  @ApiProperty()
  release_date: Date;

  @ApiProperty()
  release_price: number;

  @ApiProperty()
  currency_id: number;

  @ApiProperty()
  page_count: number;

  @ApiProperty()
  image_url: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  translated_title: string;
}
