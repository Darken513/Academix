import { AttendanceController } from '../controllers/attendance.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Attendance } from '../models/Attendance';
import { Router } from 'express';

export class AttendanceRouter extends BaseHttpRouter<Attendance> {
  constructor() {
    const controller = new AttendanceController();
    super(controller);
    this.router.get('/getAllByStudent/:studentId', (req, res) => controller.getAllByStudent(req, res));
    this.router.get('/:studentId/:sessionId', (req, res) => controller.getByStudentAndSession(req, res));
  }
}