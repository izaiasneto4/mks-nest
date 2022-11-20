import { GetUserDto } from './dtos/get-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne({ email }: GetUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, passwordConfirmation } = createUserDto;

    if (password !== passwordConfirmation) {
      throw new Error('Password confirmation does not match password');
    }

    const user = this.userRepository.create();
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    user.email = email;

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
