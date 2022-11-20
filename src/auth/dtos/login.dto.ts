import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @ApiProperty({
    description: 'User email',
    example: 'bob@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  password: string;
}
