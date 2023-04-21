import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    description: 'name of room',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'room description',
  })
  @IsOptional()
  @IsString()
  description: string;
}

export class SendMessageDto {
  @ApiProperty({
    type: Number,
    description: 'room to send the message',
  })
  @IsNotEmpty()
  @IsNumber()
  roomId: number;

  @ApiProperty({
    type: String,
    description: 'message to send to a room',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
