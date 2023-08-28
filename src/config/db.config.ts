import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { WinstonTypeOrmLogger } from 'src/common/winston.logger';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DBHOST,
  port: parseInt(process.env.DBPORT),
  username: process.env.DBUSERNAME,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  // entities: [Country, Department, Employee, Job, JobHistory, Location, Region],
  synchronize: false,
  // logging: true,
  logger: new WinstonTypeOrmLogger(),
  autoLoadEntities: true,
};
