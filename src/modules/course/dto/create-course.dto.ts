import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsOptional()
  teacherId: number;

  @IsNumber()
  price: number;

  @IsNumber()
  duration: number;

  @IsString()
  level: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  certificates?: number[];

  @IsOptional()
  @IsArray()
  students?: number[];

  @IsOptional()
  @IsArray()
  videos?: number[];

  @IsOptional()
  @IsArray()
  courseOrders?: number[];
}
