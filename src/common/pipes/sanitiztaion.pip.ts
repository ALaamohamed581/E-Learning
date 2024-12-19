import { PipeTransform, Injectable } from '@nestjs/common';
@Injectable()
export class Santiztion implements PipeTransform {
  transform(value: any) {
    if (value['firstName']) {
      value['firstname'] = value['firstName'].replace(/[^a-zA-Z0-9]/g, '');
    }
    if (value['lastName'])
      value['lastName'] = value['lastName'].replace(/[^a-zA-Z0-9]/g, '');
    return value;
  }
}
