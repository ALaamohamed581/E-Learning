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
      omit: { password: true },
      include: { sessionId: true },
    });
  }

  async update(id: number, updateAdeminDto) {
    return await this.prisma.admin.update({
      where: { id: id },
      data: updateAdeminDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
