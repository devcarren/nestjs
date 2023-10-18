import { Body, Controller, Get, Logger, Param, Post, Query, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { EmployeeDTO } from '../../dto/employee.dto';
import { EmployeeService } from '../../services/employee/employee.service';
import { MailService } from 'src/common/mail.service';
import { MailDTO } from 'src/common/mail.dto';
import { HttpService } from 'src/common/http.service';
import { log } from 'console';

@Controller('employee')
export class EmployeeController {
  private readonly _logger = new Logger(EmployeeController.name);

  constructor(
    private _employeeService: EmployeeService,
    private _emailService: MailService,
    private _httpService: HttpService,
  ) {}
  @Get('getAll')
  async getAll(@Query() queryParams: any) {
    return this._employeeService.getAll();
  }

  @Get('redirect')
  async redirect(@Req() req: Request, @Res() resp: Response) {
    console.log(' IN redirect ');
    return resp.redirect('/sample');
  }

  @Get('get/:id')
  async getEmployee(@Param() params: any, @Req() req: Request) {
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

  @Get('/sendMail')
  async sendMail() {
    const mailDTO: MailDTO = {
      from: 'abc@y.com',
      to: ['abc@y.com'],
      subject: 'ddd',
      templateContext: ['item1', 'item2', 'item3'],
    };
    this._emailService.sendMail(mailDTO, 'email.hbs');
  }

  @Get('/private/getPrivateData')
  async getPrivateData(@Req() req: Request) {
    console.log(` in Request  ${JSON.stringify(req['user'])}`);
    return 'You are in a private Method ';
  }

  @Get('/userApiData')
  async getUserAPIData() {
    const url = 'https://dtdev.dubaitrade.ae/umwsrest/api/user/v1/fetchSubUsers';
    const headers = {
      'X-DTUM-Access-Key': 'b017da8c710a97862be7a686440c91464cddd905',
      Authorization: 'Basic ZHRhcGl1c2VyOkxvZ2luMzQ1',
    };
    const body = {
      userName: 'salimak7',
    };
    const data = await this._httpService.post(url, body, { headers });
    console.log(' After data ');
    return data;
  }
}
