import { Author } from 'src/author/entities/author.entity';
import { BoxSetBook } from 'src/box-set-book/entities/box-set-book.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Currency } from 'src/currency/entities/currency.entity';
import { Language } from 'src/language/entities/language.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Serie } from 'src/serie/entities/serie.entity';
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

@Entity('BOX_SET')
export class BoxSet extends Tracability {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  box_set_id: number;

  @Column({ type: 'varchar', length: 13, nullable: false })
  isbn: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  original_box_set_title: string;

  @Column({ type: 'tinyint', nullable: false })
  language_id: number;

  @ManyToOne(() => Language, (language) => language.boxSets)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @Column({ type: 'bigint', nullable: false })
  serie_id: number;

  @ManyToOne(() => Serie, (serie) => serie.boxSets)
  @JoinColumn({ name: 'serie_id' })
  serie: Serie;

  @Column({ type: 'mediumint', nullable: false })
  author_id: number;

  @ManyToMany(() => Author, (author) => author.boxSets)
  @JoinTable({
    name: 'BOX_SET_AUTHOR',
    joinColumn: {
      name: 'box_set_id',
      referencedColumnName: 'box_set_id',
    },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'author_id',
    },
  })
  authors: Author[];

  @Column({ type: 'smallint', nullable: false })
  publisher_id: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.boxSets)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @Column({ type: 'date', nullable: false })
  release_date: Date;

  @Column({ type: 'decimal', nullable: true })
  release_price: number;

  @Column({ type: 'tinyint', nullable: true })
  currency_id: number;

  @ManyToOne(() => Currency, (currency) => currency.boxSets)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => BoxSetBook, (boxSetBook) => boxSetBook.boxSet)
  boxSetBooks: BoxSetBook[];
}
