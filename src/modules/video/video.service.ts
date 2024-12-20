import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}
  upload(createVideoDto: CreateVideoDto) {
    return this.prisma.video.create({
      data: {
        name: createVideoDto.name,
        src: createVideoDto.src,
        courseId: createVideoDto.courseId as number,
      },
    });
  }

  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
