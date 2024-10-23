import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Parent } from '../models/userRoles/Parent';

export class ParentService extends BaseHttpService<Parent> {
  constructor() {
    super(DATA_SOURCE.getRepository(Parent));
  }
}