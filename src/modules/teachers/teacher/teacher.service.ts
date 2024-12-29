import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryString } from 'src/common/typse/QueryString';
import { PrismaService } from 'src/modules/global/prisma.service';

@Injectable()
export class TeacherService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll({ limit, queryStr, skip, page, sort }: QueryString) {
    const total = await this.prisma.teacher.count({ where: queryStr });
    const numberOfPages = Math.ceil(total / limit);

    const teachers = await this.prisma.teacher.findMany({
      omit: {
        password: true,
      },
      take: limit,
      skip: skip,
      where: queryStr,

      orderBy: sort,
    });
    return {
      data: teachers,
      numberOfPages,
      page,
    };
  }

  async findOne(id: number) {
    const teacher = this.prisma.teacher.findFirst({
      where: { id },
      omit: {
        password: true,
      },
      include: { students: true, course: true, permissions: true },
    });
    if (!teacher) throw new Error('Teacher not found');
    return teacher;
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = this.prisma.teacher.findFirst({ where: { id } });
    if (!teacher) throw new Error('Teacher not found');
    return this.prisma.teacher.update({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      data: updateTeacherDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
