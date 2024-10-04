import { SubjectService } from '../services/subject.service';
import { BaseHttpController } from './basehttp.controller';
import { Subject } from '../models/Subject';

export class SubjectController extends BaseHttpController<Subject> {
  constructor() {
    const service = new SubjectService();
    super(service);
  }
}