// import {
//   BadRequestException,
//   Injectable,
//   InternalServerErrorException,
// } from '@nestjs/common';
// import Stripe from 'stripe';
// import * as paypal from '@paypal/checkout-server-sdk';
// import { PrismaService } from 'src/modules/global/prisma.service';
// import { StudenCourses } from './StudentCourses.service';

// @Injectable()
// export class PaymentService {
//   stripe: Stripe;
//   paypal: unknown;

//   constructor(
//     private readonly prisma: PrismaService,
//     private readonly studentCoures: StudenCourses,
//   ) {
//     this.stripe = new Stripe(process.env.STRIPE_API_KEY, {
//       apiVersion: '2024-12-18.acacia',
//     });
//     this.paypal = new paypal.core.PayPalHttpClient(
//       new paypal.core.SandboxEnvironment(
//         process.env.PAYPAL_CLIENT_ID,
//         process.env.PAYPAL_CLIENT_SECRET,
//       ),
//     );
//   }

//   async payWithStripe(cartId: number) {
//     const cart = await this.prisma.cart.findUnique({
//       where: { id: cartId },
//       include: {
//         carttItems: {
//           include: {
//             course: { select: { name: true, price: true, id: true } },
//           },
//         },
//       },
//     });

//     if (!cart) {
//       throw new BadRequestException(
//         'Cart not found. Please create a cart first.',
//       );
//     }

//     const lineItems = cart.carttItems.map((item) => ({
//       price_data: {
//         currency: 'egp',
//         unit_amount: Math.round(item.course.price * 100),
//         product_data: {
//           name: item.course.name,
//         },
//       },
//       quantity: item.quantity,
//     }));

//     const session = await this.stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: 'http://localhost:8000/api/v1/success',
//       cancel_url: 'http://localhost:8000/api/v1/cancel',
//       client_reference_id: cart.studentId?.toString(),
//     });
//     cart.carttItems.forEach((course) =>
//       this.studentCoures.addCourse(cart.studentId, course.cousreId),
//     );

//     return session;
//   }

//   async createPayPalOrder(cartId: number) {
//     const cart = await this.cartModel.findById(id);
//     try {
//       // Fetch all menu items in parallel
//       const menuItems = await Promise.all(
//         cart.cartItems.map(async (item: any) => {
//           console.log(item);
//           const menuItem = await this.menuModel.findById(item.menuItmes);
//           if (!menuItem) {
//             throw new BadRequestException(
//               `Menu item not found for ID: ${item.menuItem}`,
//             );
//           }
//           return { ...menuItem.toObject(), quantity: item.quantity };
//         }),
//       );

//       const purchaseUnits = [
//         {
//           items: menuItems.map((menuItem) => ({
//             name: menuItem.name,
//             sku: '001',
//             unit_amount: {
//               currency_code: 'USD',
//               value: menuItem.price.toFixed(2),
//             },
//             quantity: menuItem.quantity.toString(),
//           })),
//           amount: {
//             currency_code: 'USD',
//             value: menuItems
//               .reduce(
//                 (total, menuItem) => total + menuItem.price * menuItem.quantity,
//                 0,
//               )
//               .toFixed(2),
//             breakdown: {
//               item_total: {
//                 currency_code: 'USD',
//                 value: menuItems
//                   .reduce(
//                     (total, menuItem) =>
//                       total + menuItem.price * menuItem.quantity,
//                     0,
//                   )
//                   .toFixed(2),
//               },
//             },
//           },
//         },
//       ];

//       const createPaymentJson = {
//         intent: 'CAPTURE',
//         payer: {
//           payment_method: 'paypal',
//         },
//         application_context: {
//           return_url: 'http://localhost:3000/success',
//           cancel_url: 'http://localhost:3000/cancel',
//         },
//         purchase_units: purchaseUnits,
//       };

//       const request = new paypal.orders.OrdersCreateRequest();
//       request.requestBody(createPaymentJson as any);

//       const order = await paypalClient.execute(request);

//       const approvalUrl = order.result.links.find(
//         (link) => link.rel === 'approve',
//       );
//       if (approvalUrl) {
//         return { approvalUrl: approvalUrl.href };
//       } else {
//         throw new Error('Approval URL not found');
//       }
//     } catch (error) {
//       console.error('Error creating PayPal order:', error);
//       throw new InternalServerErrorException('Error creating PayPal order');
//     }
//   }
// }
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Stripe from 'stripe';
import * as paypal from '@paypal/checkout-server-sdk';
import { PrismaService } from 'src/modules/global/prisma.service';
import { StudenCourses } from './StudentCourses.service';

@Injectable()
export class PaymentService {
  private stripe: Stripe;
  private paypalClient: paypal.core.PayPalHttpClient;

  constructor(
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
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/success',
        client_reference_id: cart.studentId?.toString(),
      });

      await Promise.all(
        cart.carttItems.map((item) =>
          this.studentCourses.addCourse(cart.studentId, item.course.id),
        ),
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
