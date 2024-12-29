import { Module } from '@nestjs/common';
import { StudentprotalController } from './studentprotal.controller';
import { StudentPortalService } from './studentprotal.service';

@Module({
  controllers: [StudentprotalController],
  providers: [StudentPortalService],
  exports: [StudentPortalService],
})
export class StudentprotalModule {}
