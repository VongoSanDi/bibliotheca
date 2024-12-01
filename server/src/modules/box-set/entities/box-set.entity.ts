import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('BOX_SET')
export class BoxSet extends Tracability {
  box_set_id: number;

  isbn: string;

  original_box_set_title: string;

  language_id: number;

  serie_id: number;

  author_id: number;

  publisher_id: number;

  release_date: Date;

  release_price: number;

  currency_id: number;

  image_url: string;

  description: string;
}
