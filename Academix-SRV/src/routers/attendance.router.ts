import { AttendanceController } from '../controllers/attendance.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Attendance } from '../models/Attendance';

export class AttendanceRouter extends BaseHttpRouter<Attendance> {
  constructor() {
    const controller = new AttendanceController();
    super(controller);
    this.router.get('/getAllByStudent/:studentId', (req, res) => controller.getAllByStudent(req, res));
    this.router.get('/presenceCountBySession/:sessionId', (req, res) => controller.getCountStudentsPresentInSession(req, res));
    this.router.get('/presenceCountByStudentInCourse/:studentId/:courseId', (req, res) => controller.getStudentAttendanceCountByCourse(req, res));
    this.router.get('/:studentId/:sessionId', (req, res) => controller.getByStudentAndSession(req, res));
  }
}