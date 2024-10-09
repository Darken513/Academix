import { TeacherPaymentsController } from '../controllers/teacherPayments.controller';
import { BaseHttpRouter } from './basehttp.router';
import { TeacherPayments } from '../models/TeacherPayments';

export class TeacherPaymentsRouter extends BaseHttpRouter<TeacherPayments> {
  constructor() {
    const controller = new TeacherPaymentsController();
    super(controller);
  }
}