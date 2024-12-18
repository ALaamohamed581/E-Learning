import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.student.findMany({
      omit: {
        password: true,
      },
      include: { teachers: true },
      take: 5,
    });
  }

  findOne(id: number) {
    return this.prisma.student.findFirst({
      omit: {
        password: true,
      },
      where: { id },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const tracher = await this.prisma.teacher.findFirst({ where: { id: 1 } });
    const student = await this.prisma.student.findFirst({ where: { id } });
    if (!student) throw new BadRequestException('This student dosent exsits');
    return this.prisma.student.update({
      where: {
        id,
      },
      include: { teachers: true },
      data: {
        email: updateStudentDto.email,
        image: updateStudentDto.image,
        firstName: updateStudentDto.firstName,
        lastName: updateStudentDto.lastName,
        phoneNumber: updateStudentDto.phoneNumber,
        teachers: {
          connect: { studentId_teacherId: { teacherId: 1, studentId: id } },
        },
      },
    });
  }
}
