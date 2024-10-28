import { CoursStudentController } from '../controllers/coursStudent.controller';
import { BaseHttpRouter } from './basehttp.router';
import { CoursStudent } from '../models/CoursStudent';

export class CoursStudentRouter extends BaseHttpRouter<CoursStudent> {
  constructor() {
    const controller = new CoursStudentController();
    super(controller);

    // /coursStudent/createCoursStudent
    this.router.post('/createCoursStudent', (req, res) => controller.createCoursStudent(req, res));
  }
}