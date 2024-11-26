import { BookResponseDto } from 'src/book/dto/retrieve-book';
import { Book } from 'src/book/entities/book.entity';

export class BookMapper {
  static toResponseDto(book: Book): BookResponseDto {
    return new BookResponseDto({
      id: book.id,
      isbn: book.isbn,
      type_id: book.type_id,
      image_url: book.image_url,
      serie_id: book.serie_id,
      author_id: book.author_id,
      edition_id: book.edition_id,
      page_count: book.page_count,
      book_number: book.book_number,
      currency_id: book.currency_id,
      description: book.description,
      publisher_id: book.publisher_id,
      release_date: book.release_date,
      release_price: book.release_price,
      original_title: book.original_title,
      original_language_id: book.original_language_id,
    });
  }
}
