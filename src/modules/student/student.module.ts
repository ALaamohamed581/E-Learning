import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
// import { AuthModule } from './auth/auth.module';

@Module({
  controllers: [StudentController],
  providers: [StudentService],
  imports: [
    /*AuthModule*/
  ],
})
export class StudentModule {}
