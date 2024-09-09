import { Pool } from 'pg';
import { SubjectController } from '../controllers/subject.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Subject } from '../models/Subject';

export class SubjectsRouter extends BaseHttpRouter<Subject> {
  constructor(db: Pool) {
    const controller = new SubjectController(db);
    super(controller);
  }
}