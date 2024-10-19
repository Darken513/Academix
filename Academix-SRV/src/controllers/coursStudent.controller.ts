import { CoursStudentService } from '../services/coursStudent.service';
import { BaseHttpController } from './basehttp.controller';
import { CoursStudent } from '../models/CoursStudent';

export class CoursStudentController extends BaseHttpController<CoursStudent> {
  constructor() {
    const service = new CoursStudentService();
    super(service);
  }
}