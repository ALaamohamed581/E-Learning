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
import { connect } from 'http2';

@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly socketAuth: SocketAuth,
    private readonly prisma: PrismaService,
  ) {}

  @WebSocketServer()
  server: Server;
  userId: string;
  role: string;
  private userSockets = new Map<number, string>();
  onModuleInit() {
    this.server.use(async (socket: Socket, next) => {
      try {
        await this.socketAuth.use(socket, next);
        const { userId, role }: any = socket;
        this.userId = userId;
        this.role = role;
        console.log(`User connected: ${socket.id}`);
        next();
      } catch (error) {
        next(error);
      }
    });

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
      createMessageDto.receiverId + createMessageDto.senderId;

    const savedMessage = await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        senderId: createMessageDto.senderId,
        receiverId: createMessageDto.receiverId,
        sessionId: createMessageDto.sessionId,

        [this.role]: { connect: { id: this.userId } },
      },
    });
    console.log(savedMessage);
    // Get the recipient's socket ID
    // const receiverSocketId = this.userSockets.get(createMessageDto.receiverid);

    if (createMessageDto.receiverId) {
      // Emit the message to the receiver
      this.server.to(createMessageDto.receiverId).emit('privateChatMessage', {
        content: createMessageDto.content,
      });
    } else {
      console.log(
        `Receiver with ID ${createMessageDto.receiverId} is not connected.`,
      );
    }
  }

  onModuleDestroy() {
    this.server.disconnectSockets();
  }
}
