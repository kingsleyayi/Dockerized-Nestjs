import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRoomDto, SendMessageDto } from "../../dto/room.dto";
import { RoomMessage } from "../../typeorm/message.typeorm";
import { Room } from "../../typeorm/room.typeorm";
import { RoomMembers } from "../../typeorm/roommembers.typeorm";
import { UserRepo } from "../../user/repository/user.repository";
import { RoomRepo } from "../repository/room.repository";


@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomRepo) private roomRepo: RoomRepo,
    @Inject(UserRepo) private userRepo: UserRepo,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    @InjectRepository(RoomMessage)
    private roomMessageRepository: Repository<RoomMessage>,
    @InjectRepository(RoomMembers)
    private roomMemberRepository: Repository<RoomMembers>,
  ) {}

  async userCreateRoom(
    userId: number,
    createRoomDto: CreateRoomDto,
  ): Promise<Room> {
    const user = await this.userRepo.fetchUser({
      where: { id: userId },
    });
    const roomDetails = this.roomRepository.create({
      ...createRoomDto,
      memberscount: 1,
    });
    const room = await this.roomRepository.save(roomDetails);
    const roomMemberDetails = this.roomMemberRepository.create({
      user,
      room,
    });
    await this.roomMemberRepository.save(roomMemberDetails);
    return room;
  }

  async joinRoom(roomId: number, userId: number): Promise<Room> {
    const user = await this.userRepo.fetchUser({
      where: { id: userId },
    });
    const room = await this.roomRepo.fetchRoom({ where: { id: roomId } });
    const isUserInRoom = await this.roomRepo.isUserInRoom({
      where: {
        user: { id: userId },
        room: { id: roomId },
      },
    });
    if (isUserInRoom == true) {
      throw new HttpException(
        'user is Already a memer of this room',
        HttpStatus.BAD_REQUEST,
      );
    }
    const roomMemberDetails = this.roomMemberRepository.create({
      room,
      user,
    });
    await this.roomMemberRepository.save(roomMemberDetails);
    room.memberscount += 1;
    return await this.roomRepository.save(room);
  }

  async sendMessage(
    userId: number,
    sendMessageDto: SendMessageDto,
  ): Promise<RoomMessage> {
    const user = await this.userRepo.fetchUser({
      where: { id: userId },
    });
    const room = await this.roomRepo.fetchRoom({
      where: { id: sendMessageDto.roomId },
    });
    const isUserInRoom = await this.roomRepo.isUserInRoom({
      where: {
        user: { id: userId },
        room: { id: sendMessageDto.roomId },
      },
    });
    if (isUserInRoom == false) {
      throw new HttpException(
        'user is not a part of this room',
        HttpStatus.BAD_REQUEST,
      );
    }
    const messageDetails = this.roomMessageRepository.create({
      user,
      message: sendMessageDto.message,
      room,
    });
    return await this.roomMessageRepository.save(messageDetails);
  }

  async fetchRoomMessage(roomId: number): Promise<RoomMessage[]> {
    await this.roomRepo.fetchRoom({
      where: { id: roomId },
    });
    return await this.roomMessageRepository.find({
      where: { room: { id: roomId } },
      relations: ['user'],
    });
  }
}
