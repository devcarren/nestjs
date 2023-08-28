import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('login')
  async getAll() {
    return this.authService.generateJWT('carren');
  }
}
