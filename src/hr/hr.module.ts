import { Module } from '@nestjs/common';
import { EmployeeController } from './employee/controllers/employee/employee.controller';
import { Employee } from 'src/domain/employee.entity';
import { Department } from 'src/domain/department.entity';
import { Job } from 'src/domain/job.entity';
import { EmployeeService } from './employee/services/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([Employee, Department, Job])],
  providers: [EmployeeService],
})
export class HrModule {}
