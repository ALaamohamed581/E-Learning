import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudenCourses } from './StudentCourses.service';

@Module({
  controllers: [PaymentController],
  imports: [StudenCourses],
  providers: [PaymentService],
})
export class PaymentModule {}
