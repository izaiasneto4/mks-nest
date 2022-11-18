import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne({ email }: LoginUserDto): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, passwordConfirmation } = createUserDto;

    const user = this.userRepository.create();
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    user.email = email;
    user.password = password;

    if (password !== passwordConfirmation) {
      throw new Error('Password confirmation does not match password');
    }

    try {
      await this.userRepository.save(user);
      delete user.password;
      delete user.salt;

      return user;
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Email already exists');
      } else {
        throw new InternalServerErrorException(
          `Error on saving user to database`,
        );
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
