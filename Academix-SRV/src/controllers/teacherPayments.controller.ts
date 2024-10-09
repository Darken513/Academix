import { TeacherPaymentsService } from '../services/teacherPayments.service';
import { BaseHttpController } from './basehttp.controller';
import { TeacherPayments } from '../models/TeacherPayments';

export class TeacherPaymentsController extends BaseHttpController<TeacherPayments> {
  constructor() {
    const service = new TeacherPaymentsService();
    super(service);
  }
}