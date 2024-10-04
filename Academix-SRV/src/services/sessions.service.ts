import { BaseHttpService } from './basehttp.service';
import { Sessions } from '../models/Sessions';
import { DATA_SOURCE } from '../db/dataSource';

export class SessionsService extends BaseHttpService<Sessions> {
  constructor() {
    super(DATA_SOURCE.getRepository(Sessions));
  }
}