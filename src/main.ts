import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputDataSanitizationInteceptor } from './common/InputsanitizationInterceptor';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/logger.config';
import { CommonExceptionFilter } from './common/common.exception.filter';

async function bootstrap() {
  //TO Point to an external properties file, other it will look into .env under the src folder
  // config({ path: 'D:\\dev\\poc\\nestjs\\props\\.env' });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  app.useGlobalInterceptors(new InputDataSanitizationInteceptor());
  app.useGlobalFilters(new CommonExceptionFilter());

  app.enableCors();
  app.use(helmet({ contentSecurityPolicy: false }));

  app.setGlobalPrefix(`${process.env.BASERURL}/api`);
  console.log(`App starting on ${process.env.PORT}`);
  await app.listen(process.env.PORT);
}
bootstrap();
