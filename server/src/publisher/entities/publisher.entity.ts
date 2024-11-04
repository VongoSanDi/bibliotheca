import { Book } from 'src/book/entities/book.entity';
import { BoxSet } from 'src/box-set/entities/box-set.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Country } from 'src/country/entities/country.entity';
import { Serie } from 'src/serie/entities/serie.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('PUBLISHER')
export class Publisher extends Tracability {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  publisher_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  publisher_name: string;

  @Column({ type: 'varchar', length: 255 })
  website: string;

  @ManyToOne(() => Country, (country) => country.publishers)
  country: Country;

  @OneToMany(() => Book, (book) => book.publisher)
  books: Book[];

  @OneToMany(() => Serie, (serie) => serie.publisher)
  series: Serie[];

  @OneToMany(() => Publisher, (publisher) => publisher.boxSets)
  boxSets: BoxSet[];
}
