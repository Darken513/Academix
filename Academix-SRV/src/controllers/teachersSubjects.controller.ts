import { TeachersSubjectsService } from '../services/teachersSubjects.service';
import { BaseHttpController } from './basehttp.controller';
import { TeachersSubjects } from '../models/TeachersSubjects';

export class TeachersSubjectsController extends BaseHttpController<TeachersSubjects> {
  constructor() {
    const service = new TeachersSubjectsService();
    super(service);
  }
}