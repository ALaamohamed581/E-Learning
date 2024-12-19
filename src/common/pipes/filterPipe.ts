import { PipeTransform, Injectable } from '@nestjs/common';
@Injectable()
export class FilterPipe implements PipeTransform {
  transform(value: any) {
    if (value['password']) delete value['password'];
    else if (value['reEntredPassword']) delete value['reEntredPassword'];

    return value;
  }
}
