import { Pool } from 'pg';
import { BaseHttpService } from './basehttp.service';
import { User } from '../models/User';

export class UserService extends BaseHttpService<User> {
  constructor(db: Pool) {
    super(db, 'users');
  }
}