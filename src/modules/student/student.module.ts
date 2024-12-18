import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentAuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
  imports: [StudentAuthModule],
})
export class StudentModule {}
