import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { SocketAuth } from 'src/common/middlewares/chatAuthtication';

@Module({
  providers: [ChatGateway, SocketAuth],
  exports: [ChatGateway],
})
export class ChatModule {}
