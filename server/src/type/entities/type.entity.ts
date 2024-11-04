import { Book } from 'src/book/entities/book.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('TYPE')
export class Type extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  type_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  type_name: string;

  @OneToMany(() => Book, (book) => book.type)
  books: Book[];
}
