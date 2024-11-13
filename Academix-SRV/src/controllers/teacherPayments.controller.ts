import { TeacherPaymentsService } from '../services/teacherPayments.service';
import { BaseHttpController } from './basehttp.controller';
import { TeacherPayment } from '../models/TeacherPayment';

export class TeacherPaymentsController extends BaseHttpController<TeacherPayment> {
  constructor() {
    const service = TeacherPaymentsService.getInstance();
    super(service);
  }
}