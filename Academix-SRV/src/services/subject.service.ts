import { BaseHttpService } from './basehttp.service';
import { Subject } from '../models/Subject';
import { DATA_SOURCE } from '../db/dataSource';

export class SubjectService extends BaseHttpService<Subject> {
  constructor() {
    super(DATA_SOURCE.getRepository(Subject));
  }
}