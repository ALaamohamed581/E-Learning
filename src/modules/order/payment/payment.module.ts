import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StudenCourses } from './StudentCourses.service';
import { PermissionsModule } from 'src/modules/permissions/permissions.module';

@Module({
  controllers: [PaymentController],
  imports: [PermissionsModule],
  providers: [PaymentService, StudenCourses],
})
export class PaymentModule {}
