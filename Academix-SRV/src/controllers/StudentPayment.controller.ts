import { StudentPaymentService } from '../services/studentPayment.service';
import { BaseHttpController } from './basehttp.controller';
import { StudentPayment } from '../models/StudentPayment';

export class StudentPaymentController extends BaseHttpController<StudentPayment> {
  constructor() {
    const service = new StudentPaymentService();
    super(service);
  }
}