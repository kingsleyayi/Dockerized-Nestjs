import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RoomMembers } from './roommembers.typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    default:
      'https://res.cloudinary.com/deujp1l2i/image/upload/v1680121426/abstract-user-flat-4_xzrl1p.png',
  })
  avatar: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default : 0})
  memberscount: number;

  @OneToMany(() => RoomMembers, (room) => room.room)
  members: RoomMembers[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
