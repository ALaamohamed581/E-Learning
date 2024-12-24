import { Module, DynamicModule } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({})
export class GlobalModule {
  static forRoot(): DynamicModule {
    return {
      module: GlobalModule,
      providers: [PrismaService],
      exports: [PrismaService],
      global: true,
    };
  }
}
