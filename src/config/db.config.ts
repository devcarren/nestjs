import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonTypeOrmLogger } from 'src/common/winston.logger';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'carren',
  password: 'Login345',
  database: 'hr',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [Country, Department, Employee, Job, JobHistory, Location, Region],
  synchronize: false,
  // logging: true,
  logger: new WinstonTypeOrmLogger(),
  autoLoadEntities: true,
  keepConnectionAlive: true,
  extra: {
    max: 20,
    min: 5,
    idleTimeoutMillis: 30000, // 30 seconds
    connectionTimeoutMillis: 2000, // 2 seconds
  },
};
