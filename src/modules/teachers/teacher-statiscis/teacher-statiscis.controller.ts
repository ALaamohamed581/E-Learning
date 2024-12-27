import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { TeacherStatiscisService } from './teacher-statiscis.service';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import PermissionsGuard from 'src/common/gurds/role/permissions.guard';
import { Request } from 'express';

@Controller('teacher-statiscis')
export class TeacherStatiscisController {
  constructor(
    private readonly teacherStatiscisService: TeacherStatiscisService,
  ) {}
  @Get('/studnets-count')
  @UseGuards(AuthGuard('teacher'), PermissionsGuard('view-students'))
  async getMyStudents(@Req() req: Request) {
    const { userId } = req;

    return await this.teacherStatiscisService.getMyStudents(userId);
  }
  @Get('/courses-hours')
  @UseGuards(AuthGuard('teacher'), PermissionsGuard('view-course-hours'))
  async getToalHoursTaught(@Req() req: Request) {
    const { userId } = req;

    return await this.teacherStatiscisService.getToalHoursTaught(userId);
  }
  @Get('courses-revnue')
  @UseGuards(AuthGuard('teacher'), PermissionsGuard('view-revnue-hours'))
  async getTotlProfit(@Req() req: Request) {
    const { userId } = req;
    return this.teacherStatiscisService.getTotalProfit(userId);
  }
}
