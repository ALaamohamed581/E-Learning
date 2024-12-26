import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/createMessage.dto';
import { UpdateMessageDto } from './dto/updateMessag.dto';
import { ChatGateway } from './chat.gateway';
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

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
