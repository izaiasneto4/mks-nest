import { LoginDto } from './../auth/dtos/login.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('auth/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }
}
