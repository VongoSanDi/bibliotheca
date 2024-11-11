import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('BOX_SET_BOOK')
export class BoxSetBook extends Tracability {
  box_set_id: number;

  book_id: number;
}
