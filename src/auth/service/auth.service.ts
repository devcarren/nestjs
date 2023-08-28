import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private _jwtService: JwtService) {}

  async generateJWT(payload: any): Promise<string> {
    return this._jwtService.sign(payload);
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparsePassword(newPassword: string, hashedPassword: string) {
    return await bcrypt.compare(newPassword, hashedPassword);
  }
}
