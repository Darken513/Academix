import { TeachersSubjectsController } from '../controllers/teachersSubjects.controller';
import { BaseHttpRouter } from './basehttp.router';
import { TeacherSubject } from '../models/TeacherSubject';

export class TeachersSubjectsRouter extends BaseHttpRouter<TeacherSubject> {
  constructor() {
    const controller = new TeachersSubjectsController();
    super(controller);
  }
}