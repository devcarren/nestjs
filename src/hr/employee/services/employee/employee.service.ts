import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/domain/employee.entity';
import { Department } from 'src/domain/department.entity';

import { Repository } from 'typeorm';
import { Job } from 'src/domain/job.entity';
import { RepoUtils } from 'src/common/repoutils';
import { Transactional } from 'src/common/transaction.manager';
import { EmployeeDTO } from '../../dto/employee.dto';
import { log } from 'console';

@Injectable()
export class EmployeeService {
  private readonly _logger = new Logger(EmployeeService.name);

  private readonly employees: EmployeeDTO[] = [];
  constructor(
    @InjectRepository(Employee) private _employeeRepo: Repository<Employee>,
    @InjectRepository(Department) private _deptRepo: Repository<Department>,
    @InjectRepository(Job) private _jobRepo: Repository<Job>,
  ) {}

  create(employee: EmployeeDTO) {
    console.log(JSON.stringify(employee));
    this.employees.push(employee);
  }

  getAll(): EmployeeDTO[] {
    return this.employees;
  }

  // async createEmployee(emp: EmployeeDTO) {
  //   console.log(JSON.stringify(emp));
  //   // const empEntity = new Employee();
  //   // empEntity.age = 10;
  //   // empEntity.name = 'carren';
  //   // empEntity.isActive = true;
  //   // empEntity.salary = 1000;
  //   // empEntity.age = 44;
  //   // empEntity.id = 1;
  //   // const newEmp = this._employeeRepo.create(empEntity);

  //   return await this._employeeRepo.save(emp);
  // }

  @Transactional()
  async createEmployee(employeeData: any): Promise<Employee> {
    const { departmentId, managerId, hire_date, jobId, ...rest } = employeeData;

    this._logger.debug(managerId);
    this._logger.error(departmentId);
    this._logger.log(jobId);

    const manager = await this._employeeRepo.findOne({
      where: { employee_id: managerId },
    });
    const department = await this._deptRepo.findOne({
      where: { department_id: departmentId },
    });

    const job = await this._jobRepo.findOne({
      where: { job_id: jobId },
    });

    console.log('After the queries');

    if (!department) {
      throw new Error('Department not found');
    }

    if (!manager) {
      throw new Error('Manager not found');
    }

    let newEmp = new Employee();
    newEmp = await RepoUtils.mergeEntityData(newEmp, rest);
    newEmp.hire_date = new Date(hire_date);
    newEmp.job = job;
    newEmp.department = department;
    newEmp.manager = manager;
    console.log(newEmp);
    // const newEmployee = {
    //   ...rest,
    //   hire_date: new Date(hire_date),
    //   job,
    //   department,
    //   manager,
    // };

    // return null
    return await RepoUtils.insertEntity(this._employeeRepo, newEmp);
    // return await RepoUtils.upsertEntity(this._employeeRepo, newEmployee);

    // return await this._employeeRepo.save(newEmployee);
  }

  @Transactional()
  async updateEmployee(employeeData: any) {
    // const { employee_id } = employeeData;

    return await RepoUtils.update(this._employeeRepo, employeeData);
  }

  async findAllFromDepartment(departmentId: number): Promise<Employee[]> {
    return await this._employeeRepo.find({
      where: {
        department: { department_id: departmentId },
      },
    });
  }
}
