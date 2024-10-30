import { StudentPaymentService } from '../services/studentPayment.service';
import { BaseHttpController } from './basehttp.controller';
import { StudentPayment } from '../models/StudentPayment';
import { Request, Response } from 'express';

export class StudentPaymentController extends BaseHttpController<StudentPayment> {
  constructor() {
    const service = new StudentPaymentService();
    super(service);
  }

  async createStudentPayment(req: Request, res: Response): Promise<void> {
    try {
      const def = await (this.service as StudentPaymentService).createStudentPayment(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
}
}