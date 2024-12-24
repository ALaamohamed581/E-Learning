import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/modules/global/prisma.service';
import * as argon2 from 'argon2';
import { UpdatePasswordDto } from 'src/common/dtos/updatePassword.dto';
import { QueryString } from 'src/typse/QueryString';
import { paginatedData } from '../../typse/QueryString';
import { promises } from 'dns';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    limit,
    queryStr,
    skip,
    page,
    sort,
  }: QueryString): Promise<paginatedData> {
    const total = await this.prisma.student.count({ where: queryStr });
    const numberOfPages = Math.ceil(total / limit);
    const students = await this.prisma.student.findMany({
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
      data: students,
      numberOfPages,
      page,
    };
  }

  findOne(id: number) {
    return this.prisma.student.findFirst({
      omit: {
        password: true,
      },
      include: { courses: true },
      where: { id },
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.prisma.student.findFirst({ where: { id } });
    if (!student) throw new BadRequestException('This student dosent exsits');
    return this.prisma.student.update({
      omit: {
        password: true,
      },
      where: {
        id,
      },
      include: { teachers: true },
      data: updateStudentDto,
    });
  }

  async resetPassword(id: number, passwordsData: Partial<UpdatePasswordDto>) {
    const { Oldpassword, newPassword } = passwordsData;

    const exsitingUser = await this.prisma.student.findFirst({ where: { id } });
    if (!exsitingUser) {
      return new NotFoundException('user not found');
    }
    if (!argon2.verify(exsitingUser.password, Oldpassword))
      return new BadRequestException(
        'wrong password please enter the coorect one',
      );
    exsitingUser.password = await argon2.hash(newPassword);
    await this.prisma.student.update({
      where: { id },
      data: { password: exsitingUser.password },
    });
  }
  async remove(id) {
    await this.prisma.student.delete({ where: { id } });
  }
}
