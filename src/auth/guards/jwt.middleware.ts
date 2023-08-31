import { Injectable, NestMiddleware, HttpException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    console.log(`token is ${token}`);

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);
        req['user'] = decoded;
      } catch (error) {
        console.log('Invalid token');
        return next(new HttpException('Invalid token', 401));
      }
    } else {
      return next(new HttpException('No token provided', 401));
    }

    next();
  }
}
