import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('BOOK')
export class Book extends Tracability {
  book_id: number;

  isbn: string;

  original_title: string;

  original_language_id: number;

  book_number: number;

  serie_id: number;

  type_id: number;

  author_id: number;

  publisher_id: number;

  edition_id: number;

  release_date: Date;

  release_price: number;

  currency_id: number;

  page_count: number;

  image_url: string;

  description: string;
}
