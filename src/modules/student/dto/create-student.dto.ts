import { IsEmail, IsString, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
