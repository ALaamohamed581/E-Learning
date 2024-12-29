import { Module } from '@nestjs/common';
import { StudentprotalService } from './studentprotal.service';
import { StudentprotalController } from './studentprotal.controller';

@Module({
  controllers: [StudentprotalController],
  providers: [StudentprotalService],
  exports: [StudentprotalService],
})
export class StudentprotalModule {}
