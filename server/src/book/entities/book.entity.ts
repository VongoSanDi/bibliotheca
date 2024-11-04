import { Author } from 'src/author/entities/author.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Currency } from 'src/currency/entities/currency.entity';
import { Edition } from 'src/edition/entities/edition.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Serie } from 'src/serie/entities/serie.entity';
import { Type } from 'src/type/entities/type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BOOK')
export class Book extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  book_id: number;

  @Column({ type: 'varchar', length: 13, nullable: false })
  isbn: string;

  @Column({ type: 'tinyint', nullable: false })
  book_number: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  original_title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'bigint', nullable: false })
  serie_id: number;

  @ManyToOne(() => Serie, (serie) => serie.books)
  @JoinColumn({ name: 'serie_id' })
  serie: Serie;

  @Column({ type: 'tinyint', nullable: false })
  type_id: number;

  @OneToMany(() => Type, (type) => type.book)
  @JoinColumn({ name: 'type_id' })
  types: Type[];

  @Column({ type: 'mediumint', nullable: false })
  author_id: number;

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: 'BOOK_AUTHOR',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'book_id',
    },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'author',
    },
  })
  author: Author[];

  @Column({ type: 'smallint', nullable: false })
  publisher_id: number;

  @OneToMany(() => Publisher, (publisher) => publisher.book)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher[];

  @Column({ type: 'tinyint', nullable: false })
  genre_id: number;

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable({
    name: 'BOOK_GENRE',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'book_id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'genre_id',
    },
  })
  genre: Genre[];

  @Column({ type: 'date', nullable: false })
  publication_date: Date;

  @Column({ type: 'tinyint', nullable: false })
  edition_id: number;

  @ManyToMany(() => Edition, (edition) => edition.books)
  @JoinTable({
    name: 'BOOK_EDITION',
    joinColumn: {
      name: 'book_id',
      referencedColumnName: 'book_id',
    },
    inverseJoinColumn: {
      name: 'edition_id',
      referencedColumnName: 'edition_id',
    },
  })
  edition: Edition[];

  @Column({ type: 'decimal', nullable: false })
  release_price: number;

  @Column({ type: 'tinyint', nullable: false })
  currency_id: number;

  @ManyToOne(() => Currency, (currency) => currency.books)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @Column({ type: 'smallint', nullable: false })
  page_count: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image_url: string;
}
