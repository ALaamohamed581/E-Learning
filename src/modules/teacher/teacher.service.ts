import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { QueryString } from 'src/typse/QueryString';
import { PrismaService } from '../global/prisma.service';
import { CreateVideoDto } from '../video/dto/create-video.dto';
import { create } from 'domain';

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
    console.log(await this.prisma.videWtached.findMany());
    const teacher = this.prisma.teacher.findFirst({
      where: { id },
      omit: {
        password: true,
      },
      include: { students: true, course: true },
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
  async uploadVideo(id: number, courseid: number, video: CreateVideoDto) {
    const course = await this.prisma.course.findFirst({
      where: { id: courseid, teacherId: 1 },
      include: { videos: true },
    });
    if (!course) throw new NotFoundException('Course not found');
    return this.prisma.course.update({
      where: { id: courseid },
      include: { videos: true },
      data: {
        videos: {
          create: {
            src: video.src,
            name: video.name,
            order: course.videos.length,
            watched: false,
          },
        },
      },
    });
  }
  async uploadVideodirectly(
    id: number,
    courseid: number,
    video: CreateVideoDto,
    index: number,
  ) {
    try {
      const course = await this.prisma.course.findFirst({
        where: { id: courseid, teacherId: id },
        include: { videos: true },
      });

      if (!course) throw new Error('Course not found');
      await this.prisma.video.create({
        data: { ...video, courseId: courseid, order: index, watched: false },
      });
      // Update the order of existing videos
      return await Promise.all(
        course.videos.map(async (v, i) => {
          if (i >= index) {
            await this.prisma.video.update({
              where: { id: v.id },
              data: { order: i + 1 },
            });
          }
        }),
      );
    } catch (e) {
      console.log(e.message);
      throw new Error(`Failed to upload video: ${e.message}`);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} teacher`;
  }
}
