import { BaseHttpService } from './basehttp.service';
import { Attendance } from '../models/Attendance';
import { DATA_SOURCE } from '../db/dataSource';

export class AttendanceService extends BaseHttpService<Attendance> {
  constructor() {
    super(DATA_SOURCE.getRepository(Attendance));
  }
}