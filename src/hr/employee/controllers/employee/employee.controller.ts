import { Body, Controller, Get, Logger, Param, Post, Query, Req, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { EmployeeDTO } from '../../dto/employee.dto';
import { EmployeeService } from '../../services/employee/employee.service';

@Controller('employee')
export class EmployeeController {
  private readonly _logger = new Logger(EmployeeController.name);

  constructor(private _employeeService: EmployeeService) {}
  @Get('getAll')
  async getAll(@Query() queryParams: any) {
    return this._employeeService.getAll();
  }

  @Get('get/:id')
  getEmployee(@Param() params: any, @Req() req: Request) {
    this._logger.debug(`you have asked for ${params.id}`);
    return `you asked for ${params.id} employee`;
  }

  @Post('add')
  // @UsePipes(new JoiValidationPipe(employeeCreateSchema))
  async addEmployee(@Body() employeeDTO: EmployeeDTO) {
    await this._employeeService.createEmployee(employeeDTO);
    // this._employeeService.create(employeeDTO);
  }

  @Post('update')
  // @UsePipes(new JoiValidationPipe(employeeCreateSchema))
  async updateEmployee(@Body() employeeDTO: EmployeeDTO) {
    await this._employeeService.updateEmployee(employeeDTO);
    // this._employeeService.create(employeeDTO);
  }
}
