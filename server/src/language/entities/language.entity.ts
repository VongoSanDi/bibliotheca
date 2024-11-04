import { BoxSet } from 'src/box-set/entities/box-set.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Volume } from 'src/volume/entities/volume.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('LANGUAGE')
export class Language extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  language_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  language_name: string;

  @Column({ type: 'char', length: 3, nullable: false })
  iso_code: string;

  @OneToMany(() => Volume, (volume) => volume.language)
  volumes: Volume[];

  @OneToMany(() => BoxSet, (boxSet) => boxSet.language)
  boxSets: BoxSet[];
}
