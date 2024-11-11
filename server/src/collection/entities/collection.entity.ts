import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('COLLECTION')
export class Collection extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  collection_id: number;

  @Column({ type: 'mediumint', unsigned: true })
  user_id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name: string;
}
