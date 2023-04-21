import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../config/config';
import appDataSource from '../config/database/database';
import { Users } from '../typeorm/user.typeorm';
import { decodeUserJwt } from '../utils/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedException();
    } else {
      try {
        authorization = request.headers.authorization.replace('Bearer ', '');
        jwt.verify(authorization, jwtSecret);
        const decode = await decodeUserJwt(authorization);
        const user = await appDataSource
          .getRepository(Users)
          .findOne({ where: { id: decode.id } });
        if (!user) {
          throw new UnauthorizedException('Unknown Account');
        }
        request.headers.authorization = decode.id;
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
  }
}
