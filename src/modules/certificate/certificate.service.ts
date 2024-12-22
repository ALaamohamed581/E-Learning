import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { VideoStatus } from '../videos/videoStatus/videoStatus.service';
import { PrismaService } from '../global/prisma.service';

@Injectable()
export class CertificateService {
  constructor(
    private readonly videoStatus: VideoStatus,
    private readonly prisma: PrismaService,
  ) {}

  async create({ courseId, studentId }) {
    const isCourseCompleted = await this.videoStatus.isCoursCompeleted({
      cousreId: courseId,
      studentId,
    });
    if (isCourseCompleted) {
      throw new BadRequestException('Course is not completed');
    }

    const student = await this.prisma.student.findFirst({
      where: { id: studentId },
      select: {
        firstName: true,
        lastName: true,
        courses: {
          where: { id: courseId },
          select: { name: true, duration: true },
        },
      },
    });

    if (!student || !student.courses.length) {
      throw new NotFoundException('Student or course not found');
    }

    const { duration, name: courseName } = student.courses[0];
    const certificate = await this.prisma.certificate.create({
      data: {
        courseName,
        firstName: student.firstName,
        lastName: student.lastName,
        CourseDuration: duration,
        student: { connect: { id: studentId } },
        course: { connect: { id: courseId } },
      },
    });

    return {
      firstName: student.firstName,
      courseId,
      studentId,
      CourseDuration: certificate.CourseDuration,
      earnedAt: certificate.createdAt,
    };
  }

  async findOne(id: number) {
    const certificate = await this.prisma.certificate.findFirst({
      where: { id },
    });

    if (!certificate) {
      throw new NotFoundException('Certificate not found');
    }

    return {
      firstName: certificate.firstName,
      courseId: certificate.courseId,
      courseName: certificate.courseName,
      studentId: certificate.studentId,
      CourseDuration: certificate.CourseDuration,
      earnedAt: certificate.createdAt,
    };
  }
}
