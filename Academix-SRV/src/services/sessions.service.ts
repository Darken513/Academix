import { BaseHttpService } from './basehttp.service';
import { Session } from '../models/Session';
import { DATA_SOURCE } from '../db/dataSource';

export class SessionsService extends BaseHttpService<Session> {
  constructor() {
    super(DATA_SOURCE.getRepository(Session));
  }
}