import { Tracability } from 'src/common/entities/base.tracability';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('COLLECTION_VOLUME')
export class CollectionVolume extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  collection_id: number;

  volume_id: number;

  added_date: Date;
}
