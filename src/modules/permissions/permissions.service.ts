import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '../global/prisma.service';
import { QueryString } from 'src/common/typse/QueryString';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const allowed = Array.from(createPermissionDto.allowed);
    if (
      await this.prisma.permission.findFirst({
        where: {
          allowed: { equals: Array.from(createPermissionDto.allowed) },
        },
      })
    ) {
      return new BadRequestException('permission already exists');
    }
    return this.prisma.permission.create({
      data: {
        allowed,
        createdAt: new Date(),
      },
    });
  }

  async findAll({ limit, queryStr, skip, page, sort }: QueryString) {
    const total = await this.prisma.permission.count({ where: queryStr });
    const numberOfPages = Math.ceil(total / limit);
    const permissions = await this.prisma.permission.findMany({
      take: limit,
      orderBy: sort,
      skip,
      where: queryStr,
    });

    return {
      data: permissions,
      numberOfPages,
      page,
    };
  }

  async findOne(id: number) {
    const permisson = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permisson) return new NotFoundException('permision not found');
    return permisson;
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.prisma.permission.findFirst({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException('Permission not found');
    }

    const existingAllowed = Array.from(permission.allowed || []);
    const newAllowed = Array.from(updatePermissionDto.allowed || []);

    newAllowed.forEach((item) => {
      const index = existingAllowed.indexOf(item);
      if (index > -1) {
        existingAllowed.splice(index, 1);
      } else {
        existingAllowed.push(item);
      }
    });

    return await this.prisma.permission.update({
      where: { id },
      data: { allowed: { set: existingAllowed } },
    });
  }

  async remove(id: number) {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (!permission) {
      throw new NotFoundException('Permission not found');
    }
    return this.prisma.permission.delete({ where: { id } });
  }
}
