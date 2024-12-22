import { Module } from '@nestjs/common';
import { VideoStatus } from './videoStatus.service';
@Module({
  providers: [VideoStatus],
  exports: [VideoStatus],
})
export class VideoStatusModule {}
