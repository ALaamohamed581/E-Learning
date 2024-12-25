import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { logger } from 'nestjs-i18n';
import { SocketAuth } from 'src/common/middlewares/chatAuthtication';
@WebSocketGateway({ transports: ['websocket'] })
export class ChatGateway implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly socketAuth: SocketAuth) {}
  @WebSocketServer()
  server: Server;
  afterInit(clinet: Server) {
    clinet.use(async (req, next) => {
      await this.socketAuth.use(req, next);
      console.log(req.userId);

      next();
    });
  }
  onModuleInit(): any {
    this.server.on('connection', (client) =>
      console.log(`connection connected: ${client.id}`),
    );
  }
  @SubscribeMessage('newSentMessage')
  handleEvent(@MessageBody() data: string): string {
    this.server.emit('newSentMessage', data);
    return data;
  }

  @SubscribeMessage('privateChatMessage')
  privateChatMessage(
    @MessageBody() data: { targetClientId: string; messageInterface: string },
  ) {
    this.server.to(data.targetClientId).emit('privateChatMessage', data);
  }
  onModuleDestroy() {
    this.server.disconnectSockets();
  }
}
