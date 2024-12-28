import * as path from 'path';

import { DynamicModule, Logger, Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';

import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from '../../common/helpers/allExceptionsFilter';

import { PrismaService } from './prisma.service';

@Module({})
export class GlobalModlue {
  static forRoot(): DynamicModule {
    return {
      module: GlobalModlue,
      imports: [
        CacheModule.register({
          isGlobal: true,
          ttl: 60 * 1000,
        }),
        I18nModule.forRoot({
          fallbackLanguage: 'en',
          loaderOptions: {
            path: path.join(__dirname, '../../common/i18n'),
            watch: true,
          },
          resolvers: [
            { use: QueryResolver, options: ['lang'] },
            AcceptLanguageResolver,
            new HeaderResolver(['x-lang']),
          ],
        }),
        ThrottlerModule.forRoot([
          {
            ttl: 60000,
            limit: 100,
          },
        ]),

        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
        {
          provide: APP_INTERCEPTOR,
          useClass: Logger,
        },
        {
          provide: APP_FILTER,
          useClass: AllExceptionFilter,
        },
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        PrismaService,
      ],

      exports: [PrismaService],

      global: true,
    };
  }
}
