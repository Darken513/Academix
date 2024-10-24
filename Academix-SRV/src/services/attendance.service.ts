import { BaseHttpService } from './basehttp.service';
import { Attendance } from '../models/Attendance';
import { DATA_SOURCE } from '../db/dataSource';

export class AttendanceService extends BaseHttpService<Attendance> {
  constructor() {
    super(DATA_SOURCE.getRepository(Attendance));
  }
  // Custom method to fetch attendance records by student ID
  async getAttendanceByStudent(studentId: number): Promise<Attendance[]> {
    console.log("hedha houa, service reached", studentId);
    return this.repository.find({
      where: { student: { id: studentId } },  // Query using the relation, not the foreign key directly
      relations: ['student', 'session'],  // Optionally fetch related data
    });
  }
}