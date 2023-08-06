// winstonTypeOrmLogger.ts
import { winstonConfig } from 'src/config/logger.config';
import { Logger, QueryRunner } from 'typeorm';
import * as winston from 'winston';

export class WinstonTypeOrmLogger implements Logger {
  private logger = winston.createLogger({
    ...winstonConfig,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp(),
      winston.format.align(),
      winston.format.printf((info) => {
        const { timestamp, level, message, ...args } = info;

        const ts = timestamp.slice(0, 19).replace('T', ' ');

        return `${ts} [${level}]: ${message.trim()} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
      }),
    ),
  });

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.info(query, parameters);
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.error(error);
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner) {
    this.logger.warn(`Query is slow: ${query}, execution time: ${time}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.info(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.info(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
        this.logger.info(message);
        break;
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
    }
  }
}
