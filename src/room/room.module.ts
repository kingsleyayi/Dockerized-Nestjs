import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoomMessage } from "../typeorm/message.typeorm";
import { Room } from "../typeorm/room.typeorm";
import { RoomMembers } from "../typeorm/roommembers.typeorm";
import { UserRepo } from "../user/repository/user.repository";
import { RoomController } from "./controller/room.controller";
import { RoomRepo } from "./repository/room.repository";
import { RoomService } from "./service/room.service";


@Module({
  imports :[TypeOrmModule.forFeature([Room, RoomMembers, RoomMessage])],
  controllers: [RoomController],
  providers: [RoomService, RoomRepo, UserRepo]
})
export class RoomModule {}
