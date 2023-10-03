import { Controller, Get, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller('*')
export class CatchAllController {
  private readonly _logger = new Logger(CatchAllController.name);

  @Get()
  handleFallback(@Res() res: Response) {
    this._logger.debug(`in Handle bar ${res.json}`);
    res.sendFile(join(__dirname, '.', 'public', 'index.html'));
  }
}
