import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { VideoStatusModule } from '../videos/videoStatus/videoStatus.module';

@Module({
  imports: [VideoStatusModule],
  controllers: [CertificateController],
  providers: [CertificateService],
})
export class CertificateModule {}
