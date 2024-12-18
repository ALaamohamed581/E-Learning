import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './modules/global/global.module';
import { PrismaService } from './prisma.service';
import { StudentAuthModule } from './modules/student/auth/auth.module';

@Module({
  imports: [GlobalModule, StudentAuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
