import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './modules/global/global.module';
import { StudentModule } from './modules/student/student.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { ConfigModule } from '@nestjs/config';
import { UtlisModule } from './modules/utlis/utlis.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { VideoModule } from './modules/video/video.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { VideoStatusModule } from './modules/videos/videoStatus/videoStatus.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    UtlisModule.forRoot(),

    GlobalModule.forRoot(),
    StudentModule,
    AuthModule,
    TeacherModule,
    CourseModule,
    VideoModule,
    CertificateModule,
    VideoStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
