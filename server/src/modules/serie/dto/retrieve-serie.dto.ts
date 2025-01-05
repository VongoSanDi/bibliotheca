import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RetrieveSerieByTitleDto {
  @ApiProperty()
  serie_title: string;
}

export class SerieResponseDto {
  constructor(data: Partial<SerieResponseDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @ApiPropertyOptional()
  id: number;

  @ApiProperty()
  serie_id: number;

  @ApiProperty()
  serie_title: string;

  @ApiProperty()
  author_id: number;

  @ApiProperty()
  status_id: number;

  @ApiProperty()
  genre_id: number;

  @ApiProperty()
  publisher_id: number;

  @ApiProperty()
  original_language_id: number;

  @ApiProperty()
  original_volumes_count: number;

  @ApiProperty()
  translated_volumes_count: number;

  @ApiProperty()
  publication_start_date: Date;

  @ApiProperty()
  publication_end_date: Date;

  @ApiProperty()
  description: string;
}
