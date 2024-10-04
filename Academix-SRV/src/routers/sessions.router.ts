import { SessionsController } from '../controllers/sessions.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Sessions } from '../models/Sessions';

export class SessionsRouter extends BaseHttpRouter<Sessions> {
  constructor() {
    const controller = new SessionsController();
    super(controller);
  }
}