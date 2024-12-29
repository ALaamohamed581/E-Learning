import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../global/prisma.service';

@Injectable()
export class StudentPortalService {
  constructor(private readonly prisma: PrismaService) {}

  private async validateStudent(studentId: number) {
    const existingStudent = await this.prisma.student.findUnique({
      where: { id: +studentId },
    });
    if (!existingStudent) {
      throw new NotFoundException(
        "Student might have been removed or doesn't exist",
      );
    }
  }

  private async validateCourse(studentId: number, courseId: number) {
    const existingCourse = await this.prisma.course.findFirst({
      where: {
        id: +courseId,
        students: { some: { id: +studentId } },
      },
    });
    if (!existingCourse) {
      throw new NotFoundException(
        "Course might have been removed or doesn't exist",
      );
    }
  }

  async getStudentCourses(studentId: number) {
    await this.validateStudent(studentId);
    const courses = await this.prisma.course.findMany({
      where: {
        students: { some: { id: +studentId } },
      },
    });
    return courses;
  }

  async getCourseVideos(studentId: number, courseId: number) {
    await this.validateStudent(studentId);
    await this.validateCourse(studentId, courseId);

    const videos = await this.prisma.video.findMany({
      where: { courseId },
    });
    return videos;
  }

  async getCourseVideoDetails(
    studentId: number,
    courseId: number,
    videoId: number,
  ) {
    await this.validateStudent(studentId);
    await this.validateCourse(studentId, courseId);

    const video = await this.prisma.video.findFirst({
      where: { id: videoId, courseId },
    });
    if (!video) {
      throw new NotFoundException('Video might have been deleted');
    }
    return video;
  }
}
