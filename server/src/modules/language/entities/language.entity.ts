import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('LANGUAGE')
export class Language extends Tracability {
  language_id: number;

  language_name: string;

  iso_code: string;
}
