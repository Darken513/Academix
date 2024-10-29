import { CoursService } from '../services/cours.service';
import { BaseHttpController } from './basehttp.controller';
import { Cours } from '../models/Cours';
import { Request, Response } from 'express';

export class CoursController extends BaseHttpController<Cours> {
  constructor() {
    const service = new CoursService();
    super(service);
  }

  async getCoursesByTeacher(req: Request, res: Response) {
    const teacherId = parseInt(req.params.teacherId as string);

    if (isNaN(teacherId)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    try {
      const coursesByTeacher = await (this.service as CoursService).getCoursesByTeacher(teacherId);
      return res.status(200).json(coursesByTeacher);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching courses", error });
    }
  }
}