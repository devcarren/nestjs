import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('jobs')
export class Job extends BaseAuditEntity {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  job_id: string;

  @Column({ type: 'varchar', length: 35 })
  job_title: string;

  @Column({ type: 'numeric', precision: 6, nullable: true })
  min_salary: number;

  @Column({ type: 'numeric', precision: 6, nullable: true })
  max_salary: number;
}
