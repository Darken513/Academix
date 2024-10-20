import { SessionsService } from '../services/sessions.service';
import { BaseHttpController } from './basehttp.controller';
import { Session } from '../models/Session';

export class SessionsController extends BaseHttpController<Session> {
  constructor() {
    const service = new SessionsService();
    super(service);
  }
}