import { Module } from '@nestjs/common';
import { ChatGateway } from '../../gateways/chat.gateway';
import { SocketAuth } from 'src/common/middlewares/chatAuthtication';

@Module({
  providers: [ChatGateway, SocketAuth],
  exports: [ChatGateway],
})
export class ChatModule {}
