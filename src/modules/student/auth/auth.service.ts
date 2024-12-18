import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { CreateStudentDto } from '../dto/create-student.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(student: CreateStudentDto) {
    const existingUser = await this.prisma.student.findFirst({
      where: { email: student.email },
    });
    if (existingUser)
      throw new BadRequestException('This email already exists');
    console.log(student.password);
    student.password = await argon2.hash(student.password);

    const newUser = await this.prisma.student.create({
      data: {
        email: student.email,
        firstName: student.firstName,
        lastName: student.lastName,
        password: student.password,
        phoneNumber: student.phoneNumber,
      },
    });

    return newUser;
  }
  async signIn(email: string, password: string) {
    const existingUser = await this.prisma.student.findFirst({
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

  async getAuyhToken(id: number) {
    const existingUser = await this.prisma.student.findFirst({
      where: { id },
    });

    if (!existingUser) {
      return new NotFoundException('user has been deleted or dose not exsits');
    }

    return;
  }
}
