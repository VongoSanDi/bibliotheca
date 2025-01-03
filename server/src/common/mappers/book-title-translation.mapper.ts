import { BookTitleTranslationResponseDto } from 'src/modules/book-title-translation/dto/retrieve-book-title-translation.dto';
import { BookTitleTranslation } from 'src/modules/book-title-translation/entities/book-title-translation.entity';

export class BookTitleTranslationMapper {
  static toResponseDto(
    bookTitleTranslation: BookTitleTranslation,
  ): BookTitleTranslationResponseDto {
    return new BookTitleTranslationResponseDto({
      id: bookTitleTranslation.id,
      book_id: bookTitleTranslation.book_id,
      translated_title: bookTitleTranslation.translated_title,
      language_id: bookTitleTranslation.language_id,
    });
  }
}
