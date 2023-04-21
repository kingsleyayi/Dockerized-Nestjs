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

@Entity()
export class RoomMembers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.room)
  user: Users;

  @ManyToOne(() => Room, (room) => room.members)
  room: Room;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
