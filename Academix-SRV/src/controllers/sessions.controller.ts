import { SessionsService } from '../services/sessions.service';
import { BaseHttpController } from './basehttp.controller';
import { Sessions } from '../models/Sessions';

export class SessionsController extends BaseHttpController<Sessions> {
  constructor() {
    const service = new SessionsService();
    super(service);
  }
}