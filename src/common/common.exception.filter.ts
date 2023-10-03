import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class CommonExceptionFilter implements ExceptionFilter {
  private readonly _logger = new Logger(CommonExceptionFilter.name);

  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      response.status(status).json({
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      this._logger.error(exception.message);
      response.status(500).json({
        statusCode: 500,
        message: 'Internal server error',
      });
    }
  }
}
