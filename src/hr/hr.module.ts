import { Module } from '@nestjs/common';
import { EmployeeController } from './employee/controllers/employee/employee.controller';
import { Employee } from 'src/domain/employee.entity';
import { Department } from 'src/domain/department.entity';
import { Job } from 'src/domain/job.entity';
import { EmployeeService } from './employee/services/employee/employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MailService } from 'src/common/mail.service';
import { HttpService } from 'src/common/http.service';

@Module({
  controllers: [EmployeeController],
  imports: [TypeOrmModule.forFeature([Employee, Department, Job]), AuthModule],
  providers: [EmployeeService, MailService, HttpService],
})
export class HrModule {}
