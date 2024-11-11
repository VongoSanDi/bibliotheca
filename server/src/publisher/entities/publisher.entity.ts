import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('PUBLISHER')
export class Publisher extends Tracability {
  publisher_id: number;

  publisher_name: string;

  website: string;

  country_id: number;
}
