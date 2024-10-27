import { AttendanceService } from '../services/attendance.service';
import { BaseHttpController } from './basehttp.controller';
import { Attendance } from '../models/Attendance';
import { Request, Response } from 'express';

export class AttendanceController extends BaseHttpController<Attendance> {
  private attendanceService!: AttendanceService;
  
  constructor() {
    const service = new AttendanceService();
    super(service);
  }

  // New method to get attendance by student ID
  async getAttendanceByStudent(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId as string, 10);
    if (isNaN(studentId)) {
      console.log("Student ID:", studentId);
      return res.status(400).json({ message: "Invalid student ID" });
    }

    try {
      const attendanceRecords = await this.attendanceService.getAttendanceByStudent(studentId);
      if (attendanceRecords.length === 0) {
        return res.status(404).json({ message: "No attendance records found for this student" });
      }
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.log("Student ID:", studentId);
      return res.status(500).json({ message: "An error occurred while fetching attendance", error });
    }
  }
}