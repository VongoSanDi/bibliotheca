import { Tracability } from 'src/common/entities/base.tracability';
import { User } from 'src/user/entities/user.entity';
import { Volume } from 'src/volume/entities/volume.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('COLLECTION')
export class Collection extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  collection_id: number;

  @Column({ type: 'bigint', nullable: false })
  volume_id: number;

  @JoinColumn({ name: 'volume_id' })
  @ManyToOne(() => Volume, { nullable: false })
  volume: Volume;

  @Column({ type: 'bigint', nullable: false })
  user_id: number;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ type: 'date', nullable: false })
  acquision_date: Date;
}
