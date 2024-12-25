import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../global/prisma.service';
import * as argon2 from 'argon2';
import { AuthData } from 'src/common/typse/token.types';
import { CreateTeacherDto } from 'src/modules/teacher/dto/create-teacher.dto';
import { CreateStudentDto } from '../student/dto/create-student.dto';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp({ entity, model }: AuthData) {
    const existingUser = (await (this.prisma[entity] as any).findFirst({
      where: { email: model.email },
    })) as CreateTeacherDto | CreateStudentDto;
    if (existingUser)
      throw new BadRequestException('This email already exists');

    model.password = await argon2.hash(model.password);

    const newUser = (await (this.prisma[entity] as any).create({
      data: model,
    })) as CreateTeacherDto | CreateStudentDto | CreateAdminDto;

    return newUser;
  }
  async signIn(email: string, password: string, entity: 'student' | 'teacher') {
    const existingUser = await (this.prisma[entity] as any).findFirst({
      where: { email },
      include: { permissions: true },
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

    return 'access token acquired';
  }
}
