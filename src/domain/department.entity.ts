import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, VersionColumn } from 'typeorm';
import { Employee } from './employee.entity';
import { Location } from './location.entity';
import { BaseAuditEntity } from './baseaudit.entity';

@Entity('departments')
export class Department extends BaseAuditEntity {
  @PrimaryGeneratedColumn('increment')
  department_id: number;

  @Column({ type: 'varchar', length: 30 })
  department_name: string;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'manager_id' })
  manager: Employee;

  @ManyToOne(() => Location)
  @JoinColumn({ name: 'location_id' })
  location: Location;

  @OneToMany(() => Employee, (employee) => employee.department)
  employees: Employee[];
}
