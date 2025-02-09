import { AttendanceService } from '../services/attendance.service';
import { BaseHttpController } from './basehttp.controller';
import { Attendance } from '../models/Attendance';
import { Response } from 'express';
import { AppRequest } from '../core/AppRequest';

export class AttendanceController extends BaseHttpController<Attendance> {
  
  constructor() {
    const service = AttendanceService.getInstance();
    super(service);
  }

  async getByStudentAndSession(req: AppRequest, res: Response) {
    const studentId = parseInt(req.params.studentId as string);
    const sessionId = parseInt(req.params.sessionId as string);

    if (isNaN(studentId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    if (isNaN(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    try {
      const attendanceRecords = await (this.service as AttendanceService).getByStudentAndSession(studentId, sessionId);
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching attendance", error });
    }
  }

  async getAllByStudent(req: AppRequest, res: Response) {
    const studentId = parseInt(req.params.studentId as string);
    if (isNaN(studentId)) {
      console.log("Student ID:", studentId);
      return res.status(400).json({ message: "Invalid student ID" });
    }
    try {
      const attendanceRecords = await (this.service as AttendanceService).getAllByStudent(studentId);
      if (attendanceRecords.length === 0) {
        return res.status(404).json({ message: "No attendance records found for this student" });
      }
      return res.status(200).json(attendanceRecords);
    } catch (error) {
      console.log(error)
      console.log("Student ID:", studentId);
      return res.status(500).json({ message: "An error occurred while fetching attendance", error });
    }
  }
  
  async getCountStudentsPresentInSession(req: AppRequest, res: Response) {
    const sessionId = parseInt(req.params.sessionId as string);
    if (isNaN(sessionId)) {
      console.log("Session ID:", sessionId);
      return res.status(400).json({ message: "Invalid session ID" });
    }
    try {
      const count = await (
        this.service as AttendanceService
      ).getCountStudentsPresentInSession(sessionId);
      return res.status(200).json({ sessionId, presentCount: count });
    } catch (error) {
      console.log(error);
      console.log("Session ID:", sessionId);
      return res.status(500).json({
        message: "An error occurred while counting students present",
        error,
      });
    }
  }

  async getStudentAttendanceCountByCourse(req: AppRequest, res: Response) {
    const studentId = parseInt(req.params.studentId as string);
    const courseId = parseInt(req.params.courseId as string);

    if (isNaN(studentId)) {
      console.log("Student ID:", studentId);
      return res.status(400).json({ message: "Invalid Student ID" });
    }
    if (isNaN(courseId)) {
      console.log("Course ID:", courseId);
      return res.status(400).json({ message: "Invalid Course ID" });
    }
    try {
      const count = await (
        this.service as AttendanceService
      ).getStudentAttendanceCountByCourse(studentId, courseId);
      return res.status(200).json({ studentId, courseId, presentCount: count });
    } catch (error) {
      console.log(error);
      console.log("Student ID:", studentId);
      return res.status(500).json({
        message: "An error occurred while counting students present",
        error,
      });
    }

  }
}