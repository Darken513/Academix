import { BaseHttpService } from './basehttp.service';
import { StudentPayment } from '../models/StudentPayment';
import { DATA_SOURCE } from '../db/dataSource';

export class StudentPaymentService extends BaseHttpService<StudentPayment> {
  constructor() {
    super(DATA_SOURCE.getRepository(StudentPayment));
  }
}