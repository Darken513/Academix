import { TeacherPaymentsController } from '../controllers/teacherPayments.controller';
import { BaseHttpRouter } from './basehttp.router';
import { TeacherPayment } from '../models/TeacherPayment';

export class TeacherPaymentsRouter extends BaseHttpRouter<TeacherPayment> {
  constructor() {
    const controller = new TeacherPaymentsController();
    super(controller);
  }
}