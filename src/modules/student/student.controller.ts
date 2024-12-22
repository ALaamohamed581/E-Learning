import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdatePasswordDto } from 'src/common/dtos/updatePassword.dto';
import { FilterPipe } from 'src/common/pipes/filterPipe';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { QueryString } from 'src/typse/QueryString';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { CourseVideos } from './studentVideos.service';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly vids: CourseVideos,
  ) {}
  @Get()
  findAll(
    @Query(new PaginationPipe())
    { limit, queryStr, skip, page, sort }: QueryString,
  ) {
    return this.studentService.findAll({ limit, queryStr, skip, page, sort });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    this.vids.isCoursCompeleted({ cousreId: 1, studentId: 1 });
    return this.studentService.findOne(+id);
  }
  @Patch('reset-password/:id')
  resetPassword(
    @Param('id') id: number,
    @Body(new FilterPipe())
    UpdatePasswordDto: UpdatePasswordDto,
  ) {
    return this.studentService.resetPassword(id, UpdatePasswordDto);
  }
  @UseGuards(AuthGuard('student'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }
}
