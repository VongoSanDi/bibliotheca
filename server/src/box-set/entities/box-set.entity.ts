import { Author } from 'src/author/entities/author.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Currency } from 'src/currency/entities/currency.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Serie } from 'src/serie/entities/serie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('BOX_SET')
export class BoxSet extends Tracability {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  box_set_id: number;

  @Column({ type: 'varchar', length: 13, nullable: false })
  isbn: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  original_box_set_name: string;

  @Column({ type: 'bigint', nullable: false })
  serie_id: number;

  @ManyToOne(() => Serie, (serie) => serie.box_sets)
  @JoinColumn({ name: 'serie_id' })
  serie: Serie;

  @Column({ type: 'mediumint', nullable: false })
  author_id: number;

  @ManyToMany(() => Author, (author) => author.box_sets)
  @JoinTable({
    name: 'BOX_SET_AUTHOR',
    joinColumn: {
      name: 'box_set_id',
      referencedColumnName: 'box_set_id',
    },
    inverseJoinColumn: {
      name: 'auhtor_id',
      referencedColumnName: 'author_id',
    },
  })
  author: Author[];

  @Column({ type: 'smallint', nullable: false })
  publisher_id: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.box_sets)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher[];

  @Column({ type: 'date', nullable: false })
  release_date: Date;

  @Column({ type: 'decimal', nullable: true })
  release_price: number;

  @Column({ type: 'tinyint', nullable: true })
  currency_id: number;

  @ManyToOne(() => Currency, (currency) => currency.box_sets)
  @JoinColumn({ name: 'currency_id' })
  currency: Currency[];

  @Column({ type: 'varchar', length: 255, nullable: false })
  image_url: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}
