import { Tracability } from 'src/common/entities/base.tracability';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User extends Tracability {
  @PrimaryGeneratedColumn({ type: 'mediumint' })
  user_id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  username: string;

  @Column({ type: 'varchar', nullable: false })
  email: string;

  @Column({ type: 'char', nullable: false })
  password_hash: string;

  @Column({ type: 'date', nullable: true })
  birth_date: Date;

  @Column({ type: 'tinyint', nullable: true })
  gender_id: number;

  @Column({ type: 'tinyint', nullable: false })
  country_id: number;

  @Column({ type: 'date' })
  last_login: Date;
}
