import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, Check, VersionColumn } from 'typeorm';
import { Job } from './job.entity';
import { Department } from './department.entity';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('employees')
@Unique('emp_email_uk', ['email'])
@Check('emp_salary_min', 'salary > 0')
export class Employee extends BaseAuditEntity {
  @PrimaryGeneratedColumn('increment')
  employee_id: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  first_name: string;

  @Column({ type: 'varchar', length: 25 })
  last_name: string;

  @Column({ type: 'varchar', length: 25 })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number: string;

  @Column({ type: 'timestamp' })
  hire_date: Date;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ type: 'numeric', precision: 8, scale: 2, nullable: true })
  salary: number;

  @Column({ type: 'numeric', precision: 2, scale: 2, nullable: true })
  commission_pct: number;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @ManyToOne(() => Department, (department) => department.employees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
