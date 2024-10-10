import { AttendanceController } from '../controllers/attendance.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Attendance } from '../models/Attendance';

export class AttendanceRouter extends BaseHttpRouter<Attendance> {
  constructor() {
    const controller = new AttendanceController();
    super(controller);
  }
}