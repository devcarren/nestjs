import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) => ({
        secret: configservice.get('JWT_SECRET'),
        signOptions: { expiresIn: '100s' },
      }),
    }),
    // JwtModule.register({
    //   secret: 'yourSecretKey', // Replace with your actual secret key
    //   signOptions: { expiresIn: '60s' }, // Token expiration
    // }),
  ],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
