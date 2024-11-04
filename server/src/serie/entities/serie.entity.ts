import { Author } from 'src/author/entities/author.entity';
import { Book } from 'src/book/entities/book.entity';
import { BoxSet } from 'src/box-set/entities/box-set.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Status } from 'src/status/entities/status.entity';
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

@Entity('SERIE')
export class Serie extends Tracability {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  serie_id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  serie_name: string;

  @Column({ type: 'mediumint', nullable: false })
  author_id: number;

  @ManyToMany(() => Author, (author) => author.series)
  @JoinTable({
    name: 'SERIE_AUTHOR',
    joinColumn: {
      name: 'serie_id',
      referencedColumnName: 'serie_id',
    },
    inverseJoinColumn: {
      name: 'author_id',
      referencedColumnName: 'author_id',
    },
  })
  authors: Author[];

  @Column({ type: 'tinyint', nullable: false })
  status_id: number;

  @ManyToOne(() => Status, (status) => status.series, { nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @Column({ type: 'tinyint', nullable: false })
  genre_id: number;

  @ManyToMany(() => Genre, (genre) => genre.series, { nullable: false })
  @JoinTable({
    name: 'SERIE_GENRE',
    joinColumn: {
      name: 'serie_id',
      referencedColumnName: 'serie_id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'genre_id',
    },
  })
  genres: Genre[];

  @Column({ type: 'smallint' })
  publisher_id: number;

  @ManyToOne(() => Publisher, (publisher) => publisher.series)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @Column({ type: 'tinyint', nullable: true })
  original_volumes_count: number;

  @Column({ type: 'tinyint', nullable: true })
  translated_volumes_count: number;

  @Column({ type: 'date', nullable: false })
  publication_start_date: Date;

  @Column({ type: 'date', nullable: true })
  publication_end_date: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Book, (book) => book.serie)
  books: Book[];

  @OneToMany(() => BoxSet, (boxSet) => boxSet.serie)
  boxSets: BoxSet[];
}
