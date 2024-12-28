import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';
import { PrismaService } from 'src/modules/global/prisma.service';
import { StudenCourses } from './StudentCourses.service';

@Injectable()
export class PaymentService {
  stripe: Stripe;
  paypal: unknown;

  constructor(
    private readonly prisma: PrismaService,
    private readonly studentCoures: StudenCourses,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
    this.paypal = new paypal.core.PayPalHttpClient(
      new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET,
      ),
    );
  }

  async payWithStripe(cartId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: {
        carttItems: {
          include: {
            course: { select: { name: true, price: true, id: true } },
          },
        },
      },
    });

    if (!cart) {
      throw new BadRequestException(
        'Cart not found. Please create a cart first.',
      );
    }

    const lineItems = cart.carttItems.map((item) => ({
      price_data: {
        currency: 'egp',
        unit_amount: Math.round(item.course.price * 100),
        product_data: {
          name: item.course.name,
        },
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8000/api/v1/success',
      cancel_url: 'http://localhost:8000/api/v1/cancel',
      client_reference_id: cart.studentId?.toString(),
    });
    cart.carttItems.forEach((course) =>
      this.studentCoures.addCourse(cart.studentId, course.cousreId),
    );

    return session;
  }

  createPayPalOrder(cartId: number) {}
}
