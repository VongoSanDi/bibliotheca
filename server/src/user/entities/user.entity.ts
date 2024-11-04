import { Tracability } from 'src/common/entities/base.tracability';
import { Country } from 'src/country/entities/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('USER')
export class User extends Tracability {
  @PrimaryGeneratedColumn({ type: 'mediumint' })
  user_id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: false })
  email: string;

  @Column({ type: 'char', length: 60, nullable: false })
  password_hash: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'tinyint', nullable: true })
  gender_id: number;

  @Column({ type: 'tinyint', nullable: false })
  country_id: number;

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({ type: 'date' })
  last_login: Date;
}
