import { Test, TestingModule } from '@nestjs/testing';
import { TeacherStatiscisController } from './teacher-statiscis.controller';
import { TeacherStatiscisService } from './teacher-statiscis.service';

describe('TeacherStatiscisController', () => {
  let controller: TeacherStatiscisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherStatiscisController],
      providers: [TeacherStatiscisService],
    }).compile();

    controller = module.get<TeacherStatiscisController>(TeacherStatiscisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
