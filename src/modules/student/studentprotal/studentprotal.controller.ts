import { Controller } from '@nestjs/common';
import { StudentprotalService } from './studentprotal.service';

@Controller('studentprotal')
export class StudentprotalController {
  constructor(private readonly studentprotalService: StudentprotalService) {}
}
