import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaService } from 'src/modules/global/prisma.service';

@Injectable()
export class VideoService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadVideo(
    teacherId: number,
    courseId: number,
    video: CreateVideoDto,
  ) {
    const course = await this.prisma.course.findFirst({
      where: { id: courseId, teacherId: teacherId },
      include: { videos: true },
    });

    if (!course) throw new NotFoundException('Course not found');

    const createdVideo = await this.prisma.video.create({
      data: {
        src: video.src,
        name: video.name,
        courseId: courseId,
        order: course.videos.length,
        watched: false,
      },
    });

    // Fetch all students enrolled in the course
    const { students } = await this.prisma.course.findFirst({
      where: { id: courseId },
      select: { students: true },
    });

    // Create VideWtached records for each student
    await this.prisma.videWtached.createMany({
      data: students.map((student) => ({
        studentId: student.id,
        VideoId: createdVideo.id,
        courseId: courseId,
        wtached: false,
      })),
    });

    return createdVideo;
  }

  async uploadVideodirectly(
    teacherId: number,
    courseId: number,
    video: CreateVideoDto,
    index: number,
  ) {
    try {
      const course = await this.prisma.course.findFirst({
        where: { id: courseId, teacherId: teacherId },
        include: { videos: true },
      });

      if (!course) throw new Error('Course not found');

      const createdVideo = await this.prisma.video.create({
        data: { ...video, courseId: courseId, order: index, watched: false },
      });

      // Fetch all students enrolled in the course
      const { students } = await this.prisma.course.findFirst({
        where: { id: courseId },
        select: { students: true },
      });

      // Create VideWtached records for each student
      await this.prisma.videWtached.createMany({
        data: students.map((student) => ({
          studentId: student.id,
          VideoId: createdVideo.id,
          courseId: courseId,
          wtached: false,
        })),
      });

      // Update the order of existing videos
      await Promise.all(
        course.videos.map(async (v, i) => {
          if (i >= index) {
            await this.prisma.video.update({
              where: { id: v.id },
              data: { order: i + 1 },
            });
          }
        }),
      );

      return createdVideo;
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

  async remove({ videoId, teacherId, courseId }) {
    const teacher = await this.prisma.teacher.findFirst({
      where: { id: teacherId, AND: { course: { every: { id: courseId } } } },
    });
    if (!teacher) throw new NotFoundException('This course not found');

    return this.prisma.video.delete({ where: { id: videoId } });
  }
}
