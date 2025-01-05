import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm/browser';

@Entity('SERIE')
export class Serie extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column()
  serie_title: string;

  @Column()
  author_id: number;

  @Column()
  status_id: number;

  @Column()
  genre_id: number;

  @Column()
  publisher_id: number;

  @Column()
  original_language_id: number;

  @Column()
  original_volumes_count: number;

  @Column()
  translated_volumes_count: number;

  @Column()
  publication_start_date: Date;

  @Column()
  publication_end_date: Date;

  @Column()
  description: string;
}
