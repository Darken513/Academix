import { AttendanceService } from '../services/attendance.service';
import { BaseHttpController } from './basehttp.controller';
import { Attendance } from '../models/Attendance';

export class AttendanceController extends BaseHttpController<Attendance> {
  constructor() {
    const service = new AttendanceService();
    super(service);
  }
}