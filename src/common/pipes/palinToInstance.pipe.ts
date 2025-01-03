import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export const PlainToInstanceMixin = (dtoClass: any) => {
  return async (value: any) => {
    // Transform plain input to class instance
    const model = plainToInstance(dtoClass, value);

    // Validate the transformed instance
    const errors = await validate(model);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }

    return model; // Return the transformed model
  };
};
