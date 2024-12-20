import { PipeTransform, Injectable } from '@nestjs/common';
import { QueryString } from 'src/typse/QueryString';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    if (value != '') return this.paginate(value);
    return value;
  }
  paginate(queryString: QueryString) {
    const queryObj = { ...queryString };
    let sort: string;

    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    if (queryString.sort) {
      sort = queryString.sort.split(',').join(' ');
    }

    const page = queryString.page * 1 || 1;
    const limit = queryString.limit * 1 || 5;
    const skip = (page - 1) * limit;
    queryStr = JSON.parse(queryStr);

    return { limit, skip, queryStr, sort, page };
  }
}
