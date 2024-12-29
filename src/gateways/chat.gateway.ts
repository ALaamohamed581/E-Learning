import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { SocketAuth } from 'src/common/middlewares/chatAuthtication';
import { PrismaService } from '../modules/global/prisma.service';
import { CreateMessageDto } from '../modules/chat/dto/createMessage.dto';

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
  private userSockets = new Map<string, string>();

  onModuleInit() {
    this.server.use(async (socket: Socket, next) => {
      try {
        await this.socketAuth.use(socket, next);

        const { userId, role }: any = socket;
        this.userId = userId;
        this.role = role;
        if (!userId || !role) {
          throw new Error('Invalid authentication details.');
        }

        socket.data.userId = userId;
        socket.data.role = role;

        this.userSockets.set(userId, socket.id);
        console.log(
          `User connected: ${socket.id} (User ID: ${userId}, Role: ${role})`,
        );
        next();
      } catch (error) {
        console.error('Authentication failed:', error.message);
        next(error);
      }
    });

    this.server.on('connection', (socket: Socket) => {
      console.log(`New client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        const userId = socket.data.userId;
        if (userId) {
          this.userSockets.delete(userId);
          console.log(`User disconnected: ${socket.id} (User ID: ${userId})`);
        }
      });
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
    try {
      const { senderId, receiverId, content } = createMessageDto;

      if (!senderId || !receiverId || !content) {
        throw new Error('Missing required fields in message data.');
      }

      createMessageDto.sessionId = `${receiverId}-${senderId}`;

      const savedMessage = await this.prisma.message.create({
        data: {
          content,
          senderId,
          receiverId,
          sessionId: createMessageDto.sessionId,
          [this.role]: { connect: { id: this.userId } },
        },
      });

      console.log('Message saved:', savedMessage);

      if (receiverId) {
        this.server.to(receiverId).emit('privateChatMessage', {
          content,
        });
      } else {
        console.log(`Receiver with ID ${receiverId} is not connected.`);
      }
    } catch (error) {
      console.error('Error handling privateChatMessage:', error.message);
    }
  }

  onModuleDestroy() {
    this.server.disconnectSockets();
    console.log('All sockets disconnected.');
  }
}
