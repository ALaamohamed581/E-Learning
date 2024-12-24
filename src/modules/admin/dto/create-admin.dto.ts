import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { Roles } from '@prisma/client'; // Make sure the Roles enum is imported from Prisma

export class CreateAdminDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Roles)
  @IsOptional() // Optional because the default role is ADMIN
  role?: Roles;

  // You can add more fields, like permissions, if needed
}
