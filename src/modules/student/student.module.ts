import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { CourseVideos } from './studentVideos.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, CourseVideos],
  imports: [],
})
export class StudentModule {}
