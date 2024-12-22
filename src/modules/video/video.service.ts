import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/modules/global/prisma.service';
import { i } from 'vite/dist/node/types.d-aGj9QkWt';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}
  async uploadVideo(
    Teacherid: number,
    courseId: number,
    video: CreateVideoDto,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { id: courseId, teacherId: Teacherid },
      include: { videos: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    return this.prisma.course.update({
      where: { id: courseId },
      include: { videos: true },
      data: {
        videos: {
          create: {
            src: video.src,
            name: video.name,
            order: course.videos.length,
            watched: false,
          },
        },
      },
    });
  }
  async uploadVideodirectly(
    teacherId: number,
    courseid: number,
    video: CreateVideoDto,
    index: number,
  ) {
    try {
      const course = await this.prisma.course.findFirst({
        where: { id: courseid, teacherId: teacherId },
        include: { videos: true },
      });

      if (!course) throw new Error('Course not found');
      await this.prisma.video.create({
        data: { ...video, courseId: courseid, order: index, watched: false },
      });
      // Update the order of existing videos
      return await Promise.all(
        course.videos.map(async (v, i) => {
          if (i >= index) {
            await this.prisma.video.update({
              where: { id: v.id },
              data: { order: i + 1 },
            });
          }
        }),
      );
    } catch (e) {
      console.log(e.message);
      throw new Error(`Failed to upload video: ${e.message}`);
    }
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

  remove({ videoId, teacherId, courseId }) {
    const teacher = this.prisma.teacher.findFirst({
      where: { id: teacherId, AND: { course: { every: { id: courseId } } } },
    });
    if (!teacher) return new NotFoundException('this course not found');

    return this.prisma.video.delete({ where: { id: videoId } });
  }
}
