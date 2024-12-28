import { BadRequestException, Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import * as paypal from '@paypal/checkout-server-sdk';

@Injectable()
export class PaymentService {
  // stripe: Stripe;
  // paypal: unknown;
  // constructor(
  // ) {
  //   this.stripe = new Stripe(process.env.STRIPE_API_KEY);
  //   this.paypal = new paypal.core.PayPalHttpClient(
  //     new paypal.core.SandboxEnvironment(
  //       process.env.PAYPAl_CLIENT_ID,
  //       process.env.PAYPAl_CLIENT_SECRET,
  //     ),
  //   );
  // }
  // async payWithStripe(cartId: string) {
  //   /*const cart: any = await this.cartModel.findById(cartId);*/
  //   if (!cart) {
  //     throw new BadRequestException('Please create a cart');
  //   }
  //   const items = await Promise.all(
  //     cart.cartItems.map(async (item) => {
  //       const menuItem = await this.menuModel.findById(
  //         cart.cartItems.map((el) => el.menuItmes),
  //       );
  //       if (!menuItem) {
  //         throw new BadRequestException(
  //           `Menu item not found for ID: ${item.menuItmes}`,
  //         );
  //       }
  //       return { menuItem, quantity: item.quantity };
  //     }),
  //   );
  //   const lineItems = items.map((item) => ({
  //     price_data: {
  //       currency: 'egp',
  //       unit_amount: Math.round(item.menuItem.price * 100),
  //       product_data: {
  //         name: item.menuItem.name,
  //       },
  //     },
  //     quantity: item.quantity,
  //   }));
  //   const session = await this.stripe.checkout.sessions.create({
  //     line_items: lineItems,
  //     mode: 'payment',
  //     success_url: 'http://localhost:8000/api/v1/success',
  //     cancel_url: 'http://localhost:8000/api/v1-swagger/cancel',
  //     client_reference_id: cart.userId.toString(),
  //   });
  //   return session;
  // }
  // // async createPayPalOrder(id: any) {
  // //   const cart = await this.cartModel.findById(id);
  // //   try {
  // //     // Fetch all menu items in parallel
  // //     const menuItems = await Promise.all(
  // //       cart.cartItems.map(async (item: any) => {
  // //         console.log(item);
  // //         const menuItem = await this.menuModel.findById(item.menuItmes);
  // //         if (!menuItem) {
  // //           throw new BadRequestException(
  // //             `Menu item not found for ID: ${item.menuItem}`,
  // //           );
  // //         }
  // //         return { ...menuItem.toObject(), quantity: item.quantity };
  // //       }),
  // //     );
  // //     const purchaseUnits = [
  // //       {
  // //         items: menuItems.map((menuItem) => ({
  // //           name: menuItem.name,
  // //           sku: '001',
  // //           unit_amount: {
  // //             currency_code: 'USD',
  // //             value: menuItem.price.toFixed(2),
  // //           },
  // //           quantity: menuItem.quantity.toString(),
  // //         })),
  // //         amount: {
  // //           currency_code: 'USD',
  // //           value: menuItems
  // //             .reduce(
  // //               (total, menuItem) => total + menuItem.price * menuItem.quantity,
  // //               0,
  // //             )
  // //             .toFixed(2),
  // //           breakdown: {
  // //             item_total: {
  // //               currency_code: 'USD',
  // //               value: menuItems
  // //                 .reduce(
  // //                   (total, menuItem) =>
  // //                     total + menuItem.price * menuItem.quantity,
  // //                   0,
  // //                 )
  // //                 .toFixed(2),
  // //             },
  // //           },
  // //         },
  // //       },
  // //     ];
  // //     const createPaymentJson = {
  // //       intent: 'CAPTURE',
  // //       payer: {
  // //         payment_method: 'paypal',
  // //       },
  // //       application_context: {
  // //         return_url: 'http://localhost:3000/success',
  // //         cancel_url: 'http://localhost:3000/cancel',
  // //       },
  // //       purchase_units: purchaseUnits,
  // //     };
  // //     const request = new paypal.orders.OrdersCreateRequest();
  // //     request.requestBody(createPaymentJson as any);
  // //     const order = await paypalClient.execute(request);
  // //     const approvalUrl = order.result.links.find(
  // //       (link) => link.rel === 'approve',
  // //     );
  // //     if (approvalUrl) {
  // //       return { approvalUrl: approvalUrl.href };
  // //     } else {
  // //       throw new Error('Approval URL not found');
  // //     }
  // //   } catch (error) {
  // //     console.error('Error creating PayPal order:', error);
  // //     throw new InternalServerErrorException('Error creating PayPal order');
  // //   }
  // // }
}
