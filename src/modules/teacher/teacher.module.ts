import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [VideoModule],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
