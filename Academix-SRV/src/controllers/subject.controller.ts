import { Pool } from 'pg';
import { SubjectService } from '../services/subject.service';
import { BaseHttpController } from './basehttp.controller';
import { Subject } from '../models/Subject';

export class SubjectController extends BaseHttpController<Subject> {
  constructor(db: Pool) {
    const service = new SubjectService(db);
    super(service);
  }
}