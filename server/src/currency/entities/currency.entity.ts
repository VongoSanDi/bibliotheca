import { BoxSet } from 'src/box-set/entities/box-set.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('CURRENCY')
export class Currency extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  currency_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  currency_name: string;

  @Column({ type: 'char', length: 3, nullable: false })
  currency_symbol: string;

  @Column({ type: 'char', length: 3, nullable: false })
  iso_code: string;

  @OneToMany(() => BoxSet, (boxSet) => boxSet.currency)
  boxSets: BoxSet[];
}
