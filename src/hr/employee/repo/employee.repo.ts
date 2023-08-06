import { Employee } from 'src/domain/Employee.entity';
import { Repository, EntityRepository } from 'typeorm';

// @EntityRepository(Employee)
export class EmployeeRepo extends Repository<Employee> {}
