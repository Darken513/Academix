import { BaseHttpService } from './basehttp.service';
import { TeacherPayment } from '../models/TeacherPayment';
import { DATA_SOURCE } from '../db/dataSource';

export class TeacherPaymentsService extends BaseHttpService<TeacherPayment> {
  constructor() {
    super(DATA_SOURCE.getRepository(TeacherPayment));
  }
}