import { Module, DynamicModule } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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
