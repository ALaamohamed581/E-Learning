import { Injectable } from '@nestjs/common';
import { PrismaService } from '../global/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}
  create() {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return this.prisma.admin.findUnique({
      where: { id },
      include: { sessionId: true },
    });
  }

  update(id: number) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
