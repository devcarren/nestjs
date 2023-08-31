import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly _jwtService: JwtService) {}

  async generateJWT(payload: any): Promise<string> {
    const payload2 = { username: 'Carren', sub: 22 };
    return this._jwtService.sign(payload2);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparsePassword(newPassword: string, hashedPassword: string) {
    return await bcrypt.compare(newPassword, hashedPassword);
  }
}
