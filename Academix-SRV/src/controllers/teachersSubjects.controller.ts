import { TeachersSubjectsService } from '../services/teachersSubjects.service';
import { BaseHttpController } from './basehttp.controller';
import { TeacherSubject } from '../models/TeacherSubject';

export class TeachersSubjectsController extends BaseHttpController<TeacherSubject> {
  constructor() {
    const service = new TeachersSubjectsService();
    super(service);
  }
}