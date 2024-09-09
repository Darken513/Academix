import { Pool } from 'pg';
import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/User';

export class UserController extends BaseHttpController<User> {
  constructor(db: Pool) {
    const service = new UserService(db);
    super(service);
  }
}