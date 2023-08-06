import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonTypeOrmLogger } from 'src/common/winston.logger';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
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
};
