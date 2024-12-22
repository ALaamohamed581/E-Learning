import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Render,
} from '@nestjs/common';
import { CertificateService } from './certificate.service';

import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { Request } from 'express';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post('courses/:courseId')
  @Render('certificate')
  @UseGuards(AuthGuard('student'))
  create(@Req() req: Request, @Param('courseId') courseId: number) {
    const studentId = req.userId;

    return this.certificateService.create({ courseId, studentId });
  }

  @Get(':id')
  @UseGuards(AuthGuard('student'))
  @Render('certificate')
  findOne(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }
}
