import { Book } from 'src/book/entities/book.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EDITION')
export class Edition extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  edition_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  edition_name: string;

  @ManyToMany(() => Book, (book) => book.editions)
  books: Book[];
}
