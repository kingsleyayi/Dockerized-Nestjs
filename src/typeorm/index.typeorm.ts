import { RoomMessage } from "./message.typeorm";
import { Room } from "./room.typeorm";
import { RoomMembers } from "./roommembers.typeorm";
import { Users } from "./user.typeorm";


const entities = [
  Users,
  Room,
  RoomMembers,
  RoomMessage
];

export {
  Users,
  Room,
  RoomMembers,
  RoomMessage
};
export default entities;
