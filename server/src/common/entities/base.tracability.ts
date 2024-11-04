import { CreateDateColumn, Column, UpdateDateColumn } from 'typeorm';

export abstract class Tracability {
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'bigint', nullable: false })
  crated_by: number;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @Column({ type: 'int', nullable: false })
  updated_by: number;
}
