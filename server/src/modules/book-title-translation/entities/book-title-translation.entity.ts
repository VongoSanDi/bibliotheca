import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('BOOK_TITLE_TRANSLATION')
export class BookTitleTranslation {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column()
  book_id: number;

  @Column()
  translated_title: string;

  @Column()
  language_id: number;
}
