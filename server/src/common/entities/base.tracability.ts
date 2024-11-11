import { CreateDateColumn, Column, UpdateDateColumn } from 'typeorm';

export abstract class Tracability {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'mediumint', unsigned: true, nullable: false, default: 0 })
  created_by: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'mediumint', unsigned: true, nullable: false, default: 0 })
  updated_by: number;
}
