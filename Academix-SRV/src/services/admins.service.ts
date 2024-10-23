import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Admin } from '../models/userRoles/Admin';

export class AdminService extends BaseHttpService<Admin> {
  constructor() {
    super(DATA_SOURCE.getRepository(Admin));
  }
}