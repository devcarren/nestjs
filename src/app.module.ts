import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/db.config';
import { HrModule } from './hr/hr.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/guards/jwt.middleware';
@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(typeOrmConfig), HrModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes('*')
    //   .apply(JwtMiddleware)
    //   .forRoutes({ path: '*/private/*', method: RequestMethod.ALL });

    // consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(JwtMiddleware).forRoutes({ path: '*/private/*', method: RequestMethod.ALL });
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(JwtMiddleware).forRoutes(
      // { path: '*/private', method: RequestMethod.ALL },
      { path: '*/private/*', method: RequestMethod.ALL },
    );
  }
}
