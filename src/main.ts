import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InputDataSanitizationInteceptor } from './common/InputsanitizationInterceptor';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './config/logger.config';
import { config } from 'dotenv';

async function bootstrap() {
  config({ path: '/dev/poc/nestjs/props/.env' });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.useGlobalInterceptors(new InputDataSanitizationInteceptor());
  console.log(`Test Value  ${process.env.TEST}`);
  console.log(`App starting on ${process.env.PORT}`);
  // setInterval(() => {
  //   const { rss, heapTotal, heapUsed, external } = process.memoryUsage();
  //   const rssInMB = rss / (1024 * 1024);
  //   const heapTotalInMB = heapTotal / (1024 * 1024);
  //   const heapUsedInMB = heapUsed / (1024 * 1024);
  //   const externalInMB = external / (1024 * 1024);
  //   console.log('Memory usage in MB: ', { rssInMB, heapTotalInMB, heapUsedInMB, externalInMB });
  // }, 10000);

  app.enableCors();
  app.use(helmet());
  await app.listen(process.env.PORT);
}
bootstrap();
