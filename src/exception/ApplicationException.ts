import { HttpException, HttpStatus } from '@nestjs/common';

export class ApplicationException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
