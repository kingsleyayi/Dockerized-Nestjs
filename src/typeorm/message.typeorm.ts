import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Users } from './user.typeorm';
import { Room } from './room.typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RoomMessage {
  @ApiProperty({
    type: Number,
    description: 'message Id',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: Users,
    description: 'user that sent the message',
  })
  @ManyToOne(() => Users, (user) => user.room)
  user: Users;

  @ApiProperty({
    type: String,
    description: 'the message sent',
  })
  @Column()
  message : string;

  @ManyToOne(() => Room, (room) => room.members)
  room: Room;

  @ApiProperty({
    type: Date,
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    type: Date,
  })
  @UpdateDateColumn()
  public updated_at: Date;
}
