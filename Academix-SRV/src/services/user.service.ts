import { BaseHttpService } from './basehttp.service';
import { User } from '../models/userRoles/User';
import { DATA_SOURCE } from '../db/dataSource';

export class UserService extends BaseHttpService<User> {
  constructor() {
    super(DATA_SOURCE.getRepository(User));
  }
}