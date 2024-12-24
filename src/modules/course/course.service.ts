import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from '../global/prisma.service';
import { QueryString } from 'src/typse/QueryString';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}
  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        category: createCourseDto.category,
        description: createCourseDto.description,
        name: createCourseDto.name,

        teacherId: createCourseDto.teacherId as number,
        price: createCourseDto.price,
        duration: createCourseDto.duration,
        level: createCourseDto.level,
      },
    });
  }

  async findAll({ limit, queryStr, skip, page, sort }: QueryString) {
    const total = await this.prisma.student.count({ where: queryStr });
    const numberOfPages = Math.ceil(total / limit);
    const courses = await this.prisma.student.findMany({
      omit: {
        password: true,
      },
      include: { teachers: true },
      take: limit,
      orderBy: sort,
      skip,
      where: queryStr,
    });

    return {
      data: courses,
      numberOfPages,
      page,
    };
  }

  findOne(id: number) {
    return this.prisma.course.findFirst({
      where: { id },
      include: { videos: true, certificate: true, students: true },
    });
  }

  async update(id: number, updateStudentDto: UpdateCourseDto) {
    const student = await this.prisma.course.findFirst({ where: { id } });
    if (!student) throw new BadRequestException('This student dosent exsits');
    return this.prisma.student.update({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      include: { teachers: true },
      data: UpdateCourseDto,
    });
  }

  remove(id: number) {
    return this.prisma.course.delete({
      where: { id },
    });
  }
}
