import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { VideoPipe } from 'src/common/pipes/video.pipe';
import { AuthGuard } from 'src/common/gurds/authguard/authGuard.guard';
import { Request } from 'express';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  findAll() {
    return this.videoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }
  @UseGuards(AuthGuard('teacher'))
  @Delete(':id/courses/:course-id')
  remove(
    @Param('id') videoId: number,
    @Req() req: Request,
    @Param('course-id') courseId: number,
  ) {
    const teacherId = req.userId as number;
    return this.videoService.remove({ videoId, teacherId, courseId });
  }
}
