import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { VideoModule } from 'src/modules/videos/video/video.module';
import { TeacherStatiscisModule } from '../teacher-statiscis/teacher-statiscis.module';

@Module({
  imports: [TeacherStatiscisModule, VideoModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
