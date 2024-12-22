import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { VideoStatusModule } from '../videoStatus/vvideoStatus.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [VideoStatusModule],
})
export class StudentModule {}
