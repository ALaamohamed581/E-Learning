import { Test, TestingModule } from '@nestjs/testing';
import { TeacherStatiscisService } from './teacher-statiscis.service';

describe('TeacherStatiscisService', () => {
  let service: TeacherStatiscisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeacherStatiscisService],
    }).compile();

    service = module.get<TeacherStatiscisService>(TeacherStatiscisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
