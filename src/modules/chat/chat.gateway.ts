import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketAuth } from 'src/common/middlewares/chatAuthtication';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../global/prisma.service';
import { CreateMessageDto } from './dto/createMessage.dto';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly socketAuth: SocketAuth,
    private readonly prisma: PrismaService,
  ) {}

  @WebSocketServer()
  server: Server;
  private userSockets = new Map<number, string>();
  onModuleInit() {
    // this.server.use(async (socket: Socket, next) => {
    //   try {
    //     // await this.socketAuth.use(socket, next);
    //     console.log(`User connected: ${socket.id}`);
    //     next();
    //   } catch (error) {
    //     next(error);
    //   }
    // });

    this.server.on('connection', (socket: Socket) => {
      console.log(`New client connected: ${socket.id}`);
    });
  }

  @SubscribeMessage('newSentMessage')
  handleNewSentMessage(@MessageBody() data: string): void {
    this.server.emit('newSentMessage', data);
  }

  @SubscribeMessage('privateChatMessage')
  async handlePrivateChatMessage(
    @MessageBody() createMessageDto: CreateMessageDto,
  ): Promise<void> {
    createMessageDto.sessionId =
      createMessageDto.receiverid + createMessageDto.senderid;
    console.log(createMessageDto);
    const savedMessage = await this.prisma.message.create({
      data: {
        senderid: createMessageDto.senderid,
        content: createMessageDto.content,
        sessionId: createMessageDto.sessionId,
        receiverid: createMessageDto.receiverid,
      },
    });

    // Get the recipient's socket ID
    // const receiverSocketId = this.userSockets.get(createMessageDto.receiverid);

    if (createMessageDto.receiverid) {
      // Emit the message to the receiver
      this.server.to(createMessageDto.receiverid).emit('privateChatMessage', {
        content: createMessageDto.content,
      });
    } else {
      console.log(
        `Receiver with ID ${createMessageDto.receiverid} is not connected.`,
      );
    }
  }

  onModuleDestroy() {
    this.server.disconnectSockets();
  }
}
