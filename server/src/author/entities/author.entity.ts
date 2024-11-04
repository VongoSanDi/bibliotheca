import { Tracability } from 'src/common/entities/base.tracability';
import { Country } from 'src/country/entities/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('AUTHOR')
export class Author extends Tracability {
  @PrimaryGeneratedColumn({ type: 'mediumint' })
  author_id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  last_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  first_name: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  pen_name: string;

  @Column({ type: 'tinyint', nullable: false })
  country_id: number;

  @JoinColumn({ name: 'country_id' })
  @ManyToOne(() => Country, (country) => country.authors)
  country: Country;

  @Column({ type: 'text', nullable: true })
  biography: string;
}
