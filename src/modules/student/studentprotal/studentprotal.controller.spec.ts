import { Test, TestingModule } from '@nestjs/testing';
import { StudentprotalController } from './studentprotal.controller';
import { StudentprotalService } from './studentprotal.service';

describe('StudentprotalController', () => {
  let controller: StudentprotalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentprotalController],
      providers: [StudentprotalService],
    }).compile();

    controller = module.get<StudentprotalController>(StudentprotalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
