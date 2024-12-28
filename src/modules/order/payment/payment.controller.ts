import { Controller, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('checkout-compeleted')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  @Post('stripe/:cartId')
  paywithStripe(@Param('cartId') cartid: string) {
    return this.paymentService.payWithStripe(+cartid);
  }

  @Post('payPal/:cartId')
  PayWithPayPal(@Param('cartId') cartid: string) {
    return this.paymentService.createPayPalOrder(+cartid);
  }
}
