import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../global/prisma.service';

@Injectable()
export class StudenCourses {
  constructor(private readonly prisma: PrismaService) {}

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

    return newCourse;
  }
}
