import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { VideoStatusModule } from '../videos/videoStatus/videoStatus.module';
import { StudentprotalModule } from './studentprotal/studentprotal.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [VideoStatusModule, StudentprotalModule],
})
export class StudentModule {}
