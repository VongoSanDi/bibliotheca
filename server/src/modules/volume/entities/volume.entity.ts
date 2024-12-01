import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('VOLUME')
export class Volume extends Tracability {
  volume_id: number;

  book_id: number;

  language_id: number;

  translated_title: string;

  acquisition_price: number;

  currency_id: number;

  acquisition_date: Date;
}
