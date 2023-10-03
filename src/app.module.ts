import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './common/logger.middleware';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './config/db.config';
import { HrModule } from './hr/hr.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './auth/guards/jwt.middleware';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.CONFIG_PATH,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => getTypeOrmConfig(configService),
      inject: [ConfigService],
    }),

    HrModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
  ],
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
    consumer.apply(LoggerMiddleware).forRoutes('/api/*');
    consumer.apply(JwtMiddleware).forRoutes(
      // { path: '*/private', method: RequestMethod.ALL },
      { path: '/api/*/private/*', method: RequestMethod.ALL },
    );
  }
}
