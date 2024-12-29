import { Test, TestingModule } from '@nestjs/testing';
import { StudentprotalService } from './studentprotal.service';

describe('StudentprotalService', () => {
  let service: StudentprotalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentprotalService],
    }).compile();

    service = module.get<StudentprotalService>(StudentprotalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
