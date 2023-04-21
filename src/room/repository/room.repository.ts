import { NotFoundException } from "@nestjs/common";
import appDataSource from "../../config/database/database";
import { Room } from "../../typeorm/room.typeorm";
import { RoomMembers } from "../../typeorm/roommembers.typeorm";



export class RoomRepo {
  async fetchRoom(param: any): Promise<Room> {
    const room = await appDataSource.getRepository(Room).findOne(param);
    if (!room) {
      throw new NotFoundException('room not found');
    }
    return room;
  }

  async isUserInRoom(param: any): Promise<boolean> {
    const roomMember = await appDataSource
      .getRepository(RoomMembers)
      .findOne(param);
    if (!roomMember) {
      return false;
    }
    return true;
  }
}
