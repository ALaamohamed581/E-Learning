import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';

import { UtlisModule } from './modules/utlis/utlis.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { VideoModule } from './modules/video/video.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { VideoStatusModule } from './modules/videos/videoStatus/videoStatus.module';
import { AdminModule } from './modules/admin/admin.module';
import { GlobalModlue } from './modules/global/global.module';

@Module({
  imports: [
    UtlisModule.forRoot(),

    GlobalModlue.forRoot(),
    StudentModule,
    AuthModule,
    TeacherModule,
    CourseModule,
    VideoModule,
    CertificateModule,
    VideoStatusModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
