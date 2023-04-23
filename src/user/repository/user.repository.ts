import { NotFoundException } from '@nestjs/common';
import appDataSource from '../../config/database/database';
import { Users } from '../../typeorm/user.typeorm';
import { FindOneOptions } from 'typeorm';

export class UserRepo {
  async fetchUser(param: FindOneOptions): Promise<Users> {
    const user = await appDataSource.getRepository(Users).findOne(param);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
