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
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { Request } from 'express';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { QueryString } from 'src/typse/QueryString';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(AuthGuard('teacher'))
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    createCourseDto.teacherId = req.userId;
    console.log(createCourseDto.teacherId);
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(
    @Query(new PaginationPipe())
    { limit, queryStr, skip, page, sort }: QueryString,
  ) {
    return this.courseService.findAll({ limit, queryStr, skip, page, sort });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
