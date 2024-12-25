import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsSemVer } from 'class-validator';

export class CreatePermissionDto {
  @Transform(({ value }) => new Set(value))
  @IsNotEmpty()
  allowed: Set<string>;
}
