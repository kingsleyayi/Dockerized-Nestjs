import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { RoomMembers } from './roommembers.typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Users {
  @ApiProperty({
    type: Number,
    description: 'user Id ',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: String,
    description: 'user name ',
  })
  @Column()
  name: string;

  @ApiProperty({
    type: String,
    description: 'user avatar ',
  })
  @Column({
    default:
      'https://res.cloudinary.com/deujp1l2i/image/upload/v1680121426/abstract-user-flat-4_xzrl1p.png',
  })
  avatar: string;

  @Column()
  password: string;

  @ApiProperty({
    type: String,
    description: 'user email ',
  })
  @Column()
  email: string;

  @OneToMany(() => RoomMembers, (room) => room.user)
  room: RoomMembers[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  public updated_at: Date;
}
