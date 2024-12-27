import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [PaymentController],
  imports: [MongooseModule.forFeature([])],
  providers: [PaymentService],
})
export class PaymentModule {}
