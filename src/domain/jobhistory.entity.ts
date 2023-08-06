import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn, Check, VersionColumn } from 'typeorm';
import { Job } from './job.entity';
import { Department } from './department.entity';
import { Employee } from './employee.entity';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('job_history')
@Check('jhist_date_interval', 'end_date > start_date')
export class JobHistory extends BaseAuditEntity {
  @PrimaryColumn()
  employee_id: number;

  @PrimaryColumn({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'timestamp' })
  end_date: Date;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}
