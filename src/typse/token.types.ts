import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { CreateTeacherDto } from 'src/modules/teacher/dto/create-teacher.dto';

export type TokenData = {
  token: string;
  secret: string;
};
export type Token = {
  payload: Payload;
  secret: string;
  expiresIn: string;
};

export type Payload = CreateStudentDto | CreateTeacherDto;
export type AuthData = {
  model: CreateStudentDto | CreateTeacherDto;
  entity: 'student' | 'teacher';
};
