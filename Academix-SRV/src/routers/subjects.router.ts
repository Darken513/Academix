import { SubjectController } from '../controllers/subject.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Subject } from '../models/Subject';

export class SubjectsRouter extends BaseHttpRouter<Subject> {
  constructor() {
    const controller = new SubjectController();
    super(controller);
  }
}