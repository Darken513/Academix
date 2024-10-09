import { BaseHttpService } from './basehttp.service';
import { TeacherPayments } from '../models/TeacherPayments';
import { DATA_SOURCE } from '../db/dataSource';

export class TeacherPaymentsService extends BaseHttpService<TeacherPayments> {
  constructor() {
    super(DATA_SOURCE.getRepository(TeacherPayments));
  }
}