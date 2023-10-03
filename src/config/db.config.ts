import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonTypeOrmLogger } from 'src/common/winston.logger';

// config();

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USRNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [Country, Department, Employee, Job, JobHistory, Location, Region],
  synchronize: false,
  // logging: true,
  logger: new WinstonTypeOrmLogger(),
  autoLoadEntities: true,
  keepConnectionAlive: true,
  extra: {
    max: parseInt(process.env.DB_CONN_POOL_MAX),
    min: parseInt(process.env.DB_CONN_POOL_MIN),
    idleTimeoutMillis: 30000, // 30 seconds
    connectionTimeoutMillis: 2000, // 2 seconds
  },
});
