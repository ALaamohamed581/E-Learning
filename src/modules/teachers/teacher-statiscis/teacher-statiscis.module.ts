import { Module } from '@nestjs/common';
import { TeacherStatiscisService } from './teacher-statiscis.service';
import { TeacherStatiscisController } from './teacher-statiscis.controller';

@Module({
  controllers: [TeacherStatiscisController],
  providers: [TeacherStatiscisService],
  exports: [TeacherStatiscisService],
})
export class TeacherStatiscisModule {}
