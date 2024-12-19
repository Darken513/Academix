import { CoursStudentController } from '../controllers/coursStudent.controller';
import { BaseHttpRouter } from './basehttp.router';
import { CoursStudent } from '../models/CoursStudent';

export class CoursStudentRouter extends BaseHttpRouter<CoursStudent> {
  constructor() {
    const controller = new CoursStudentController();
    super(controller);
    this.router.get("/students/:studentId/courses", (req, res) => controller.getCoursesByStudent(req, res));
    this.router.get("/student/:studentId/course/:courseId/payments", (req, res) => controller.getStudentPaymentsByStudentAndCourse(req, res));
    this.router.get("/student/:studentId/payments", (req, res) => controller.getStudentPaymentsByStudent(req, res));

  }
}