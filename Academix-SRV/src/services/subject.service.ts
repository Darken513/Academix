import { Pool } from 'pg';
import { BaseHttpService } from './basehttp.service';
import { Subject } from '../models/Subject';

export class SubjectService extends BaseHttpService<Subject> {
  constructor(db: Pool) {
    super(db, 'subjects');
  }
}