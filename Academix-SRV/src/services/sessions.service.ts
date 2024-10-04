import { Pool } from 'pg';
import { BaseHttpService } from './basehttp.service';
import { Sessions } from '../models/Sessions';

export class SessionsService extends BaseHttpService<Sessions> {
  constructor(db: Pool) {
    super(db, 'sessions');
  }
}