import { Controller } from '@nestjs/common';
import { TeacherStatiscisService } from './teacher-statiscis.service';

@Controller('teacher-statiscis')
export class TeacherStatiscisController {
  constructor(private readonly teacherStatiscisService: TeacherStatiscisService) {}
}
