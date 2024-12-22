import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { VideoStatusModule } from '../videos/videoStatus/videoStatus.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [VideoStatusModule],
})
export class StudentModule {}
