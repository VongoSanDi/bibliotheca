import { Tracability } from 'src/common/entities/base.tracability';
import { Serie } from 'src/serie/entities/serie.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('STATUS')
export class Status extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  status_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  status_name: string;

  @OneToMany(() => Serie, (serie) => serie.status)
  series: Serie[];
}
