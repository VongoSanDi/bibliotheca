import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('EDITION')
export class Edition extends Tracability {
  edition_id: number;

  edition_name: string;
}
