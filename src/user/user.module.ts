import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../typeorm/user.typeorm";
import { UserController } from "./controller/user.controller";
import { UserRepo } from "./repository/user.repository";
import { UserService } from "./service/user.service";


@Module({
  imports :[JwtModule.register({}),TypeOrmModule.forFeature([Users])],
  controllers: [UserController],
  providers: [UserService, UserRepo]
})
export class UserModule {}