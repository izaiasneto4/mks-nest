import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User email',
    example: 'bob@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User password',
    example: 'mysupersecretpassword',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.password === o.confirmPassword)
  @ApiProperty({
    description: 'User password confirmation',
    example: 'mysupersecretpassword',
  })
  passwordConfirmation: string;
}
