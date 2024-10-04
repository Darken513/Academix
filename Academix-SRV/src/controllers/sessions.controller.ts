import { Pool } from 'pg';
import { SessionsService } from '../services/sessions.service';
import { BaseHttpController } from './basehttp.controller';
import { Sessions } from '../models/Sessions';

export class SessionsController extends BaseHttpController<Sessions> {
  constructor(db: Pool) {
    const service = new SessionsService(db);
    super(service);
  }
}