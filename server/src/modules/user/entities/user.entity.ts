import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USER')
export class User extends Tracability {
  @PrimaryGeneratedColumn({ type: 'mediumint', unsigned: true })
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  birth_date: Date;

  @Column()
  gender_id: number;

  @Column()
  country_id: number;

  @Column()
  last_login: Date;
}
