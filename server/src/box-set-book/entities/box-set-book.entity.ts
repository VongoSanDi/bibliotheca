import { Book } from 'src/book/entities/book.entity';
import { BoxSet } from 'src/box-set/entities/box-set.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('BOX_SET_BOOK')
export class BoxSetBook extends Tracability {
  @PrimaryColumn({ type: 'smallint' })
  box_set_id: number;

  @PrimaryColumn({ type: 'bigint' })
  book_id: number;

  @ManyToOne(() => Book, { nullable: false })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => BoxSet, { nullable: false })
  @JoinColumn({ name: 'box_set_id' })
  boxSet: BoxSet;
}
