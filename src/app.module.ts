declare module 'express' {
  interface Request {
    payload?: Payload;
    permissions?: string[];
    queryString?: any;
    userId?: number;
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './modules/student/student.module';

import { UtlisModule } from './modules/utlis/utlis.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { CertificateModule } from './modules/certificate/certificate.module';
import { VideoStatusModule } from './modules/videos/videoStatus/videoStatus.module';
import { AdminModule } from './modules/admin/admin.module';
import { GlobalModlue } from './modules/global/global.module';
import { Payload } from './common/typse/token.types';
import { ChatModule } from './modules/chat/chat.module';
import { PaymentModule } from './modules/order/payment/payment.module';
import { TeacherModule } from './modules/teachers/teacher/teacher.module';
import { VideoModule } from './modules/videos/video/video.module';
import { CartModule } from './modules/order/cart/cart.module';

@Module({
  imports: [
    UtlisModule.forRoot(),
    GlobalModlue.forRoot(),
    ChatModule,
    StudentModule,
    AuthModule,
    TeacherModule,
    CourseModule,
    VideoModule,
    CertificateModule,
    VideoStatusModule,
    AdminModule,
    ChatModule,
    PaymentModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
