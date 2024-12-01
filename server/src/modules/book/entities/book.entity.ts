import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BOOK')
export class Book extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column()
  isbn: string;

  @Column()
  original_title: string;

  @Column()
  original_language_id: number;

  @Column()
  book_number: number;

  @Column()
  serie_id: number;

  @Column()
  type_id: number;

  @Column()
  author_id: number;

  @Column()
  publisher_id: number;

  @Column()
  edition_id: number;

  @Column()
  release_date: Date;

  @Column()
  release_price: number;

  @Column()
  currency_id: number;

  @Column()
  page_count: number;

  @Column()
  image_url: string;

  @Column()
  description: string;
}
