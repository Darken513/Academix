import { AttendanceController } from '../controllers/attendance.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Attendance } from '../models/Attendance';
import { Router } from 'express';

export class AttendanceRouter extends BaseHttpRouter<Attendance> {
  constructor() {
    const controller = new AttendanceController();
    super(controller);

    // Define route: /attendance/student?studentId=123
    this.router.get('/student/:studentId', (req, res) => controller.getAttendanceByStudent(req, res));
    
  }
}