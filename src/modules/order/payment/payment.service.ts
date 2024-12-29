import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';
import { PrismaService } from '../../global/prisma.service';
import { StudenCourses } from './StudentCourses.service';
import { PermissionsService } from '../../permissions/permissions.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private paypalClient: paypal.core.PayPalHttpClient;

  constructor(
    private readonly permissions: PermissionsService,
    private readonly prisma: PrismaService,
    private readonly studentCourses: StudenCourses,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
    this.paypalClient = new paypal.core.PayPalHttpClient(
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
        product_data: { name: item.course.name },
      },
      quantity: item.quantity,
    }));

    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        //thease are dummy urls in real world scienro add real frontend      success_url  & cancel_url
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/success',
        client_reference_id: cart.studentId?.toString(),
      });

      await Promise.all(
        cart.carttItems.map((item) => {
          this.permissions.create({
            allowed: new Set[`access-course-${item.cousreId}`](),
          });
          this.studentCourses.addCourse(cart.studentId, item.course.id);
        }),
      );

      return session;
    } catch (error) {
      console.error('Error creating Stripe session:', error);
      throw new InternalServerErrorException('Error processing payment.');
    }
  }

  async createPayPalOrder(cartId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { carttItems: { include: { course: true } } },
    });

    if (!cart) {
      throw new BadRequestException('Cart not found.');
    }

    const purchaseUnits = [
      {
        items: cart.carttItems.map((item) => ({
          name: item.course.name,
          unit_amount: {
            currency_code: 'USD',
            value: item.course.price.toFixed(2),
          },
          quantity: item.quantity.toString(),
        })),
        amount: {
          currency_code: 'USD',
          value: cart.carttItems
            .reduce(
              (total, item) => total + item.course.price * item.quantity,
              0,
            )
            .toFixed(2),
          breakdown: {
            item_total: {
              currency_code: 'USD',
              value: cart.carttItems
                .reduce(
                  (total, item) => total + item.course.price * item.quantity,
                  0,
                )
                .toFixed(2),
            },
          },
        },
      },
    ];

    const createPaymentJson = {
      intent: 'CAPTURE',
      application_context: {
        return_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/success',
      },
      purchase_units: purchaseUnits,
    };

    try {
      const request = new paypal.orders.OrdersCreateRequest();
      request.requestBody(createPaymentJson as any);

      const order = await this.paypalClient.execute(request);
      const approvalUrl = order.result.links.find(
        (link) => link.rel === 'approve',
      );

      if (!approvalUrl) {
        throw new InternalServerErrorException('Approval URL not found');
      }

      return { approvalUrl: approvalUrl.href };
    } catch (error) {
      console.error('Error creating PayPal order:', error);
      throw new InternalServerErrorException('Error creating PayPal order');
    }
  }
}

//get student
// update permision
//add acces-course -5 for exmape on each added course
