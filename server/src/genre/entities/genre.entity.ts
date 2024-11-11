import { Tracability } from 'src/common/entities/base.tracability';
import { Entity } from 'typeorm';

@Entity('GENRE')
export class Genre extends Tracability {
  genre_id: number;

  genre_name: string;
}
