import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @Transform(({ value }) => new Set(value))
  @IsNotEmpty()
  allowed: Set<string>;
}
