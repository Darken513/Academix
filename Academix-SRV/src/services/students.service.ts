import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Student } from '../models/userRoles/Student';

export class StudentService extends BaseHttpService<Student> {
  constructor() {
    super(DATA_SOURCE.getRepository(Student));
  }
}