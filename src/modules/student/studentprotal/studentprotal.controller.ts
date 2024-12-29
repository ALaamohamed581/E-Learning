import { Controller, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { Request } from 'express';
import { StudentPortalService } from './studentprotal.service';

@Controller('student-protal')
export class StudentprotalController {
  constructor(private readonly studentprotalService: StudentPortalService) {}
  @UseGuards(AuthGuard('student'))
  getStudnetCourses(@Param('Course-id') courseId: number, @Req() req: Request) {
    const { userId: StudntId } = req;
    this.studentprotalService.getStudentCourses(StudntId);
  }
}
