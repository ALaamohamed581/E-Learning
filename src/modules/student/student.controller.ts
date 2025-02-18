import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Req,
  Delete,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdatePasswordDto } from 'src/common/dtos/updatePassword.dto';
import { FilterPipe } from 'src/common/pipes/filterPipe';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { QueryString } from 'src/common/typse/QueryString';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { VideoStatus } from '../videos/videoStatus/videoStatus.service';
import { Request } from 'express';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly videoStatus: VideoStatus,
  ) {}
  @Get()
  async findAll(
    @Query(new PaginationPipe())
    { limit, queryStr, skip, page, sort }: QueryString,
  ) {
    return await this.studentService.findAll({
      limit,
      queryStr,
      skip,
      page,
      sort,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
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

  @UseGuards(AuthGuard('student'))
  @Patch('/courses/:courseId/vidoes/:videoId')
  watchvideo(
    @Body() data: boolean,
    @Req() req: Request,
    @Param('videoId') videoId: number,
    @Param('courseId') courseId: number,
  ) {
    const studentId = req.userId;

    this.videoStatus.watchVideo({
      courseId,
      data,
      studentId,
      VideoId: videoId,
    });
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.studentService.remove(id);
  }
}
