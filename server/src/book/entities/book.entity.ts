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
  OneToOne,
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

  @JoinColumn({ name: 'serie_id' })
  @OneToOne(() => Serie, { nullable: false })
  serie: Serie;

  @Column({ type: 'tinyint', nullable: false })
  type_id: number;

  @JoinColumn({ name: 'type_id' })
  @OneToMany(() => Type, (type) => type.books)
  types: Type[];

  @Column({ type: 'mediumint', nullable: false })
  author_id: number;

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
  @ManyToMany(() => Author, (author) => author.books)
  author: Author[];

  @Column({ type: 'mediumint', nullable: false })
  publisher_id: number;

  @JoinColumn({ name: 'publisher_id' })
  @OneToMany(() => Publisher, (publisher) => publisher.books)
  publisher: Publisher[];

  @Column({ type: 'tinyint', nullable: false })
  genre_id: number;

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
  @ManyToMany(() => Genre, (genre) => genre.books)
  genre: Genre[];

  @Column({ type: 'date', nullable: false })
  publication_date: Date;

  @Column({ type: 'tinyint', nullable: false })
  edition_id: number;

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
  @ManyToMany(() => Edition, (edition) => edition.books)
  edition: Edition[];

  @Column({ type: 'decimal', nullable: false })
  release_price: number;

  @Column({ type: 'tinyint', nullable: false })
  currency_id: number;

  @JoinColumn({ name: 'currency_id' })
  @ManyToOne(() => Currency, (currency) => currency.books)
  currency: Currency;

  @Column({ type: 'smallint', nullable: false })
  page_count: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image_url: string;
}
