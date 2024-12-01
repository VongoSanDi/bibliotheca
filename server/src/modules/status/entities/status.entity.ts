import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('STATUS')
export class Status extends Tracability {
  status_id: number;

  status_code: string;
}
