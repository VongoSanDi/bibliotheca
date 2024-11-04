import { Tracability } from 'src/common/entities/base.tracability';
import { Serie } from 'src/serie/entities/serie.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('EDITION')
export class Genre extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  edition_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  edition_name: string;

  @ManyToMany(() => Serie, (serie) => serie.genres)
  series: Serie[];
}
