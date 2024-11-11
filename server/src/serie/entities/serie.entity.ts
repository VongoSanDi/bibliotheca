import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('SERIE')
export class Serie extends Tracability {
  serie_id: number;

  serie_name: string;

  author_id: number;

  status_id: number;

  genre_id: number;

  publisher_id: number;

  original_language_id: number;

  original_volumes_count: number;

  translated_volumes_count: number;

  publication_start_date: Date;

  publication_end_date: Date;

  description: string;
}
