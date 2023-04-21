import {
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterUserDto, AuthUserDto } from '../../dto/user.dto';
import { AuthGuard } from '../../middleware/userAuth.middleware';
import { Users } from '../../typeorm/user.typeorm';
import { UserService } from '../service/user.service';
import { Request } from 'express';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({ status: 200, description: 'user created' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerUserDto: RegisterUserDto) {
    return await this.userService.registerUser(registerUserDto);
  }

  @Post('login')
  @ApiBody({ type: AuthUserDto })
  @ApiResponse({ status: 200, description: 'user logged in' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async login(@Body() authUserDto: AuthUserDto) {
    return await this.userService.loginUser(authUserDto);
  }

  @Get('fetch-user')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('Authorization')
  @ApiResponse({ status: 200, description: 'user details', type: Users })
  @HttpCode(HttpStatus.OK)
  async featchUser(@Req() req: Request) {
    const userId = req.headers.authorization;
    return await this.userService.fetchUserByiD(Number(userId));
  }
}
