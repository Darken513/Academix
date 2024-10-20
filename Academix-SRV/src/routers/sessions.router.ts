import { SessionsController } from '../controllers/sessions.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Session } from '../models/Session';

export class SessionsRouter extends BaseHttpRouter<Session> {
  constructor() {
    const controller = new SessionsController();
    super(controller);
  }
}