import { StudentPaymentController } from '../controllers/StudentPayment.controller';
import { BaseHttpRouter } from './basehttp.router';
import { StudentPayment } from '../models/StudentPayment';

export class StudentsPaymentRouter extends BaseHttpRouter<StudentPayment> {
  constructor() {
    const controller = new StudentPaymentController();
    super(controller);
  }
}