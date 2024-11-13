import { Student } from '../models/userRoles/Student';
import { StudentService } from '../services/students.service';
import { BaseHttpController } from './basehttp.controller';

export class StudentController extends BaseHttpController<Student> {
  constructor() {
    const service = StudentService.getInstance();
    super(service);
  }
}