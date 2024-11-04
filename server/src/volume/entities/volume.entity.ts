import { Book } from 'src/book/entities/book.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Currency } from 'src/currency/entities/currency.entity';
import { Language } from 'src/language/entities/language.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('VOLUME')
export class Volume extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  volume_id: number;

  @Column({ type: 'bigint', nullable: false })
  book_id: number;

  @JoinColumn({ name: 'book_id' })
  @ManyToOne(() => Book, (book) => book.volumes, { nullable: false })
  book: Book;

  @Column({ type: 'varchar', nullable: false })
  translated_title: string;

  @Column({ type: 'smallint', nullable: false })
  language_id: number;

  @JoinColumn({ name: 'language_id' })
  @ManyToOne(() => Language, { nullable: false })
  language: Language;

  @Column({ type: 'decimal', nullable: true })
  acquision_price: number;

  @Column({ type: 'smallint', nullable: false })
  currency_id: number;

  @JoinColumn({ name: 'currency_id' })
  @OneToOne(() => Currency)
  currency: Currency;
}
