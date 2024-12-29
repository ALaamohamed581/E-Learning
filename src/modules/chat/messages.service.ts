import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { ChatGateway } from '../../gateways/chat.gateway';
import { PrismaService } from '../global/prisma.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly ChatGateway: ChatGateway,
    private readonly prisma: PrismaService,
  ) {}
  async create(createMessageDto: CreateMessageDto) {
    return await this.prisma.message.create({ data: createMessageDto });
  }

  findAll() {
    return `This action returns all messages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }
}
