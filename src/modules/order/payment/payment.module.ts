import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StudenCourses } from './StudentCourses.service';

@Module({
  controllers: [PaymentController],
  imports: [],
  providers: [PaymentService, StudenCourses],
})
export class PaymentModule {}
