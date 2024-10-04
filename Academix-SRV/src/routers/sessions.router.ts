import { Pool } from 'pg';
import { SessionsController } from '../controllers/sessions.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Sessions } from '../models/Sessions';

export class SessionsRouter extends BaseHttpRouter<Sessions> {
  constructor(db: Pool) {
    const controller = new SessionsController(db);
    super(controller);
  }
}