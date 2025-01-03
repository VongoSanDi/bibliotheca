import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookTitleTranslationDto {
  @ApiProperty()
  id: number;
}

export class BookTitleTranslationResponseDto {
  constructor(data: Partial<BookTitleTranslationResponseDto>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  book_id: number;

  @ApiProperty()
  translated_title: string;

  @ApiProperty()
  language_id: number;
}
