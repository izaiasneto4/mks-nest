import { CreateUserDto } from './dtos/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDto } from './dtos/get-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get(':email')
  async getUser(@Body() getUserDto: GetUserDto) {
    return await this.usersService.findOne(getUserDto);
  }
}
