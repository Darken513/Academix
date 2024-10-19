import { TeachersSubjectsController } from '../controllers/teachersSubjects.controller';
import { BaseHttpRouter } from './basehttp.router';
import { TeachersSubjects } from '../models/TeachersSubjects';

export class TeachersSubjectsRouter extends BaseHttpRouter<TeachersSubjects> {
  constructor() {
    const controller = new TeachersSubjectsController();
    super(controller);
  }
}