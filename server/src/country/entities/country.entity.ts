import { Author } from 'src/author/entities/author.entity';
import { Tracability } from 'src/common/entities/base.tracability';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('COUNTRY')
export class Country extends Tracability {
  @PrimaryGeneratedColumn({ type: 'tinyint' })
  country_id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  country_name: string;

  @Column({ type: 'char', length: 2, nullable: false })
  iso_code: string;

  @OneToMany(() => Author, (author) => author.country)
  authors: Author[];

  @OneToMany(() => Publisher, (publisher) => publisher.country)
  publishers: Publisher[];

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
