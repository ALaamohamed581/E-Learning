import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PaginationPipe } from 'src/common/pipes/pagination.pipe';
import { QueryString } from 'src/common/typse/QueryString';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoPipe } from 'src/common/pipes/images.pipe';
import { CreateVideoDto } from '../video/dto/create-video.dto';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { Request } from 'express';
import { VideoService } from '../video/video.service';
import { createReadStream } from 'fs';

@Controller('teachers')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
    private readonly VideoService: VideoService,
  ) {}

  @Get()
  findAll(
    @Query(new PaginationPipe())
    { limit, queryStr, skip, page, sort }: QueryString,
  ) {
    return this.teacherService.findAll({ limit, queryStr, skip, page, sort });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(+id, updateTeacherDto);
  }
  @Post(':courseid/courses')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(AuthGuard('teacher'))
  uploadVideo(
    @Param('courseid') courseId: number,
    @Body() CreateVideoDto: CreateVideoDto,
    @UploadedFile(new VideoPipe()) videoUrl: string,
    @Req() req: Request,
  ) {
    [CreateVideoDto.src] = videoUrl;

    return this.VideoService.uploadVideo(1, courseId, CreateVideoDto);
  }
  @Patch(':courseid/courses')
  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(AuthGuard('teacher'))
  uploadVideodirectly(
    @Param('courseid') courseId: number,
    @Body() CreateVideoDto: CreateVideoDto,
    @UploadedFile(new VideoPipe()) videoUrl: string,
    @Body() body: any,
  ) {
    [CreateVideoDto.src] = videoUrl;
    CreateVideoDto.courseId = courseId;
    const { index } = body;

    return this.VideoService.uploadVideodirectly(
      1,
      courseId,
      CreateVideoDto,
      +index,
    );
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
