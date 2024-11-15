import { CoursStudentService } from '../services/coursStudent.service';
import { BaseHttpController } from './basehttp.controller';
import { CoursStudent } from '../models/CoursStudent';
import { Request, Response } from 'express';
import { DATA_SOURCE } from '../db/dataSource';
import { Student } from '../models/userRoles/Student';

export class CoursStudentController extends BaseHttpController<CoursStudent> {
  constructor() {
    const service = CoursStudentService.getInstance();
    super(service);
  }

  async getCoursesByStudent(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId);

    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID provided." });
    }

    try {
        // Retrieve courses associated with the student
        const courses = await (this.service as CoursStudentService).getCoursesByStudent(studentId);

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found for this student." });
        }

        // Return the list of courses
        const courseDetails = courses.map((cs) => cs.cours); // Extract only the course details
        return res.status(200).json(courseDetails);

    } catch (error) {
        console.error("Error fetching courses by student:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
  }

  async getStudentPaymentsByStudentAndCourse(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId);
    const courseId = parseInt(req.params.courseId);

    if (isNaN(studentId) || isNaN(courseId)) {
        return res.status(400).json({ error: "Invalid student ID or course ID provided." });
    }
    try {
        // Find the CoursStudent entry linking the student and the course
        const studentPayments = await (this.service as CoursStudentService).getStudentPaymentsByStudentAndCourse(studentId, courseId);

        if (!studentPayments) {
            return res.status(404).json({
                message: "No matching student payments found for this student and course.",
            });
        }

        // Return the related student payments
        return res.status(200).json(studentPayments);

    } catch (error) {
        console.error("Error fetching student payments by student and course:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
  }
  
  async getStudentPaymentsByStudent(req: Request, res: Response) {
    const studentId = parseInt(req.params.studentId);

    if (isNaN(studentId)) {
        return res.status(400).json({ error: "Invalid student ID." });
    }
    try {
        // Find the CoursStudent entry linking the student and the course
        const studentPayments = await (this.service as CoursStudentService).getStudentPaymentsByStudent(studentId);
        if (!studentPayments) {
            return res.status(404).json({
                message: "No matching course or student payments found for this student and course.",
            });
        }

        // Return the related student payments
        return res.status(200).json(studentPayments);

    } catch (error) {
        console.error("Error fetching student payments by student and course:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
  }

}