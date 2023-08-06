import { Module } from '@nestjs/common';
import { EmployeeController } from './controllers/employee/employee.controller';
import { EmployeeService } from './services/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/domain/Employee.entity';
import { Department } from 'src/domain/department.entity';
import { Job } from 'src/domain/job.entity';

@Module({
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([Employee, Department, Job])],
  providers: [EmployeeService],
})
export class EmployeeModule {}
