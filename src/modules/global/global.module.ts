import { Module, DynamicModule, All } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionFilter } from 'src/common/helpers/allExceptionsFilter';
import { PrismaService } from 'src/prisma.service';

@Module({})
export class GlobalModule {
  static forRoot(): DynamicModule {
    return {
      module: GlobalModule,
      providers: [
        PrismaService,
        {
          provide: APP_FILTER,
          useClass: AllExceptionFilter,
        },
      ],
      exports: [PrismaService],
      global: true,
    };
  }
}
