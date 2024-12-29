import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../global/prisma.service';
@Injectable()
export class VideoStatus {
  constructor(private readonly prisma: PrismaService) {}

  async watchVideo({ courseId, studentId, VideoId, data }) {
    const foundStudent = await this.prisma.student.findFirst({
      where: {
        id: studentId,
        courses: { some: { id: courseId } },
      },
    });
    if (!foundStudent) {
      throw new NotFoundException('Course not found or student not found');
    }

    const updatedVideo = await this.prisma.videWtached.update({
      where: {
        studentId_VideoId_courseId: { courseId, studentId, VideoId },
      },
      data: data,
    });
    return updatedVideo;
  }

  async isCoursCompeleted({ cousreId, studentId }) {
    const isCompelted = await this.prisma.videWtached.findFirst({
      where: {
        courseId: cousreId,
        studentId,
        wtached: false,
      },
    });
    console.log(isCompelted);
    return isCompelted;
  }
}
