import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('COUNTRY')
export class Country extends Tracability {
  country_id: number;

  country_name: string;

  iso_code: string;
}
