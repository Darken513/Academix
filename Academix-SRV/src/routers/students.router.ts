import { StudentController } from '../controllers/students.controller';
import { Student } from '../models/userRoles/Student';
import { BaseHttpRouter } from './basehttp.router';

export class StudentsRouter extends BaseHttpRouter<Student> {
  constructor() {
    const controller = new StudentController();
    super(controller);
  }
}