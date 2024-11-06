import { AttendanceController } from '../controllers/attendance.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Attendance } from '../models/Attendance';

export class AttendanceRouter extends BaseHttpRouter<Attendance> {
  constructor() {
    const controller = new AttendanceController();
    super(controller);
    this.router.get('/getAllByStudent/:studentId', (req, res) => controller.getAllByStudent(req, res));
    this.router.get('/presenceCount/:sessionId', (req, res) => controller.countStudentsPresentInSession(req, res));
    this.router.get('/:studentId/:sessionId', (req, res) => controller.getByStudentAndSession(req, res));
  }
}