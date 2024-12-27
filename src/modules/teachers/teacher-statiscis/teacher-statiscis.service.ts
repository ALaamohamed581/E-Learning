import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/global/prisma.service';

@Injectable()
export class TeacherStatiscisService {
  constructor(private readonly prisma: PrismaService) {}

  async getMyStudents(id: number) {
    const exsitingTeacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!exsitingTeacher) {
      return new NotFoundException('teacher not found ');
    }
    const myStudnets = await this.prisma.student.count({
      where: {
        AND: [
          { teachers: { every: { id: id } } }, // Original condition
          { teachers: { some: {} } }, // Ensure there are teachers
        ],
      },
    });

    console.log(id);
    console.log(myStudnets);
    return myStudnets;
  }
  async getToalHoursTaught(id: number) {
    const exsitingTeacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!exsitingTeacher) {
      return new NotFoundException('teacher not found ');
    }
    const TahgthCourses = await this.prisma.course.findMany({
      where: { teacherId: id },
      select: { duration: true },
    });
    const totAlHoursTahgut = TahgthCourses.map(
      (course) => course.duration,
    ).reduce((a, b) => a + b);

    return totAlHoursTahgut;
  }

  async getTotalProfit(id: number) {
    const existingTeacher = await this.prisma.teacher.findUnique({
      where: { id },
    });

    if (!existingTeacher) {
      throw new NotFoundException('Teacher not found');
    }

    const courses = await this.prisma.course.findMany({
      where: { teacherId: id },
      select: { price: true, students: true },
    });

    const totalRevenue = courses.reduce((acc, course) => {
      const courseRevenue = course.price * course.students.length;
      return acc + courseRevenue;
    }, 0);

    return totalRevenue;
  }
}
