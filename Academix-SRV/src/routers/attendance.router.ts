import { AttendanceController } from '../controllers/attendance.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Attendance } from '../models/Attendance';
import { Router } from 'express';

export class AttendanceRouter extends BaseHttpRouter<Attendance> {
  constructor() {
    const controller = new AttendanceController();
    super(controller);

    // Add custom route for getting attendance by student ID
    const router = Router();

    // Define route: /attendance/student?studentId=123
    router.get('/attendance/student', (req, res) => controller.getAttendanceByStudent(req, res));
    
    // Register this custom router along with BaseHttpRouter routes
    this.router.use(router);

    console.log();
  }
}