import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../global/prisma.service';
import { VideoStatus } from '../videoStatus/videoStatus.service';

@Injectable()
export class StudenCourses {
  constructor(
    private readonly prisma: PrismaService,
    private readonly videoStatus: VideoStatus,
  ) {}

  async addCourse(id: number, courseId: number) {
    const course = await this.prisma.course.findFirst({
      where: { id: courseId },
      include: { videos: true },
    });

    if (!course) throw new BadRequestException('This course does not exist');

    const newCourse = await this.prisma.student.update({
      where: { id },

      data: {
        courses: { connect: { id: courseId } },
      },
    });
    this.videoStatus.addVideos({
      courseId: courseId,
      userId: id,
      videos: course.videos,
    });
    return newCourse;
  }
}
