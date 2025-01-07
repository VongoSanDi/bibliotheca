import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RetrieveSerieTitleTranslationDto {
  @ApiPropertyOptional()
  language_id?: number;

  @ApiPropertyOptional()
  serie_id?: number;

  @ApiPropertyOptional()
  translated_title?: string
}

export class SerieTitleTranslationResponseDto {
  constructor(data: Partial<SerieTitleTranslationResponseDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  serie_id: number;

  @ApiProperty()
  translated_title: string;

  @ApiProperty()
  language_id: number;
}
