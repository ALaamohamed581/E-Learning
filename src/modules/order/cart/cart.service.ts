import { Injectable } from '@nestjs/common';
import { CreateCartDto, CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { PrismaService } from 'src/modules/global/prisma.service';
import { connect } from 'http2';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCartDto: CreateCartDto) {
    const cart = await this.prisma.cart.create({
      data: {
        studentId: createCartDto.studentId,
      },
    });
    const { carttItems } = createCartDto;
    const cartItems = await this.prisma.cartItem.createMany({
      data: carttItems.map((el) => ({
        cousreId: el.courseId,
        quantity: el.quantity,
        cartId: cart.id,
      })),
    });
    return { cart, cartItems };
  }
  async findAll(page: number = 1, pageSize: number = 10) {
    try {
      const carts = await this.prisma.cart.findMany({
        take: pageSize,
        skip: (page - 1) * pageSize,
        include: {
          carttItems: true,
        },
      });
      return carts;
    } catch (error) {
      throw new Error(`Failed to fetch carts: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const cart = await this.prisma.cart.findUnique({
        where: { id },
        include: {
          carttItems: true,
        },
      });

      if (!cart) {
        throw new Error(`Cart with ID ${id} not found`);
      }

      return cart;
    } catch (error) {
      throw new Error(`Failed to fetch cart: ${error.message}`);
    }
  }

  async update(id: number, updateCartDto: unknown) {
    try {
      const updatedCart = await this.prisma.cart.update({
        where: { id },
        data: updateCartDto,
      });

      return updatedCart;
    } catch (error) {
      throw new Error(`Failed to update cart: ${error.message}`);
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.cart.delete({
        where: { id },
      });

      return { message: `Cart with ID ${id} has been removed` };
    } catch (error) {
      throw new Error(`Failed to remove cart: ${error.message}`);
    }
  }
}
