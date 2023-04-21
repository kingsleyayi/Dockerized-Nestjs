import {
  UseGuards,
  Controller,
  Inject,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  HttpStatus,
  Body,
  Req,
  Put,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateRoomDto, SendMessageDto } from '../../dto/room.dto';
import { AuthGuard } from '../../middleware/userAuth.middleware';
import { RoomMessage } from '../../typeorm/message.typeorm';
import { RoomService } from '../service/room.service';
import { Request } from 'express';

@UseGuards(AuthGuard)
@ApiTags('Room')
@ApiBearerAuth('Authorization')
@Controller('room')
export class RoomController {
  constructor(@Inject(RoomService) private readonly roomService: RoomService) {}

  @Post('create-room')
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({ status: 200, description: 'room created' })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async createRoom(@Body() createRoomDto: CreateRoomDto, @Req() req: Request) {
    const userId = req.headers.authorization;
    return await this.roomService.userCreateRoom(Number(userId), createRoomDto);
  }

  @Put('join-room/:roomId')
  @ApiResponse({ status: 200, description: 'user joined room' })
  @ApiResponse({
    status: 400,
    description: 'user is Already a memer of this room',
  })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async joinRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Req() req: Request,
  ) {
    const userId = req.headers.authorization;
    return await this.roomService.joinRoom(roomId, Number(userId));
  }

  @Post('send-message')
  @ApiBody({ type: SendMessageDto })
  @ApiResponse({ status: 200, description: 'message sent', type: RoomMessage })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
    @Req() req: Request,
  ) {
    const userId = req.headers.authorization;
    return await this.roomService.sendMessage(Number(userId), sendMessageDto);
  }

  @Get('room-message/:roomId')
  @ApiResponse({
    status: 200,
    description: 'room Messages',
    type: RoomMessage,
    isArray: true,
  })
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  async roomMessages(@Param('roomId', ParseIntPipe) roomId: number) {
    return await this.roomService.fetchRoomMessage(roomId);
  }
}
