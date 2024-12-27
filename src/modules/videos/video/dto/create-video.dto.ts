import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateVideoDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  src: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  courseId: number;
}
