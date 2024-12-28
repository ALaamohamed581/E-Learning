import { Type } from 'class-transformer';
import { IsArray, IsNumber, ValidateNested } from 'class-validator';
export class CreateCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCartItemDto)
  carttItems: CreateCartItemDto[];
  @IsNumber()
  studentId: number;
}

export class CreateCartItemDto {
  @IsNumber()
  courseId: number;

  @IsNumber()
  quantity: number;
}
