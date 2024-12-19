import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { AuthData } from 'src/typse/token.types';
import { Student, Teacher, Prisma } from '@prisma/client';
import { CreateTeacherDto } from 'src/modules/teacher/dto/create-teacher.dto';
import { CreateStudentDto } from '../dto/create-student.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp({ entity, model }: AuthData) {
    const existingUser = (await (this.prisma[entity] as any).findFirst({
      where: { email: model.email },
    })) as CreateTeacherDto | CreateStudentDto;
    if (existingUser)
      throw new BadRequestException('This email already exists');
    console.log(model.password);
    model.password = await argon2.hash(model.password);

    const newUser = (await (this.prisma[entity] as any).create({
      data: {
        email: model.email,
        firstName: model.firstName,
        lastName: model.lastName,
        password: model.password,
        phoneNumber: model.phoneNumber,
        image: model.image,
      },
    })) as CreateTeacherDto | CreateStudentDto;

    return newUser;
  }
  async signIn(email: string, password: string, entity: 'student' | 'teacher') {
    const existingUser = await (this.prisma[entity] as any).findFirst({
      where: { email },
    });
    if (!existingUser)
      throw new BadRequestException('This email dosent exsits');

    if (
      !existingUser ||
      !(await argon2.verify(existingUser.password, password))
    ) {
      throw new UnauthorizedException('wrong email or password');
    }
    return existingUser;
  }

  async getAuyhToken(id: number, entity: 'student' | 'teacher') {
    const existingUser = await (this.prisma[entity] as any).findFirst({
      where: { id },
    });

    if (!existingUser) {
      return new NotFoundException('user has been deleted or dose not exsits');
    }

    return;
  }
}
