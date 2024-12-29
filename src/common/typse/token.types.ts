import { CreateStudentDto } from 'src/modules/student/dto/create-student.dto';
import { CreateTeacherDto } from 'src/modules/teachers/teacher/dto/create-teacher.dto';

export type TokenData = {
  token: string;
  secret: string;
};
export type Token = {
  payload: Payload;
  secret: string;
  expiresIn: string;
};

export type AuthData = {
  model: CreateStudentDto | CreateTeacherDto;
  entity: string;
};
export type Payload = {
  existingUser: CreateStudentDto | CreateTeacherDto;
  onlyAllowd: string[][];
};
