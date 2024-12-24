import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PlainToInstanceMixin } from 'src/common/pipes/palinToInstance.pipe';
import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { CreateTeacherDto } from 'src/modules/teacher/dto/create-teacher.dto';
import { BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from 'src/modules/admin/dto/create-admin.dto';

@Injectable()
export class EntityInterCetor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const { entity } = req.params;

    // Dynamically assign the correct DTO class based on the entity
    let dtoClass: any;
    if (entity === 'student') {
      dtoClass = CreateStudentDto;
    } else if (entity === 'teacher') {
      dtoClass = CreateTeacherDto;
    } else if (entity === 'admin') {
      dtoClass = CreateAdminDto;
    } else {
      throw new BadRequestException('Invalid entity type');
    }

    // Use the PlainToInstanceMixin function to transform the body
    req.body = PlainToInstanceMixin(dtoClass)(req.body); // Call the function directly

    return next.handle();
  }
}
