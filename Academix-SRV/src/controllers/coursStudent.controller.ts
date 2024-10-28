import { CoursStudentService } from '../services/coursStudent.service';
import { BaseHttpController } from './basehttp.controller';
import { CoursStudent } from '../models/CoursStudent';
import { Request, Response } from 'express';

export class CoursStudentController extends BaseHttpController<CoursStudent> {
  constructor() {
    const service = new CoursStudentService();
    super(service);
  }

  async createCoursStudent(req: Request, res: Response): Promise<void> {
    try {
      const def = await (this.service as CoursStudentService).createCoursStudent(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
}
}