import {
  Injectable,
  Inject,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { jwtSecret } from '../../config/config';
import { RegisterUserDto, AuthUserDto } from '../../dto/user.dto';
import { Users } from '../../typeorm/user.typeorm';
import { IuserWithToken } from '../../types/user.interface';
import { UserRepo } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,
    @Inject(UserRepo) private userRepo: UserRepo,
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async getTokensUser(id: number, email: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync(
      {
        id: id,
        email,
      },
      {
        secret: jwtSecret,
        expiresIn: 60 * 60 * 24,
      },
    );
    return accessToken;
  }

  async registerUser(
    registerUserDto: RegisterUserDto,
  ): Promise<IuserWithToken> {
    const isExist = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });
    if (isExist) {
      throw new HttpException('User Already exist', HttpStatus.BAD_REQUEST);
    }
    registerUserDto.password = await this.bcrypt(registerUserDto.password);
    const userDetails = this.userRepository.create({
      ...registerUserDto,
    });

    const user = await this.userRepository.save(userDetails);
    const token = await this.getTokensUser(user.id, user.email);
    return { user, token };
  }

  async loginUser(authUserDto: AuthUserDto): Promise<IuserWithToken> {
    const user = await this.userRepo.fetchUser({
      where: { email: authUserDto.email },
    });
    const isMatch = await this.bcryptCompare(
      authUserDto.password,
      user.password,
    );
    if (user.email == authUserDto.email && isMatch == true) {
      const token = await this.getTokensUser(user.id, user.email);
      return { user, token };
    }
    throw new NotFoundException('user not found');
  }

  async fetchUserByiD(userId: number): Promise<Users> {
    const user = await this.userRepo.fetchUser({
      where: { id: userId },
    });
    return user;
  }

  async bcrypt(rawPassword: string): Promise<string> {
    const SALT = await bcrypt.genSaltSync();
    return bcrypt.hash(rawPassword, SALT);
  }

  async bcryptCompare(rawPassword: string, hash: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, hash);
  }
}
