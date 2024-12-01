import { Tracability } from 'src/common/entities/base.tracability';
import { Country } from 'src/modules//country/entities/country.entity';
import { Entity } from 'typeorm';

@Entity('AUTHOR')
export class Author extends Tracability {
  author_id: number;

  last_name: string;

  first_name: string;

  pen_name: string;

  country_id: Country;

  biography: string;
}
