import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    description: 'The users Name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class AuthUserDto {
  @ApiProperty({
    type: String,
    description: 'Email of user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'password of user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
