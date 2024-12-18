import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalModule } from './modules/global/global.module';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [GlobalModule, StudentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
