import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('TYPE')
export class Type extends Tracability {
  type_id: number;

  type_name: string;
}
