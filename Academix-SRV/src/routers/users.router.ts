import { Pool } from 'pg';
import { UserController } from '../controllers/user.controller';
import { BaseHttpRouter } from './basehttp.router';
import { User } from '../models/User';

export class UsersRouter extends BaseHttpRouter<User> {
  constructor(db: Pool) {
    const controller = new UserController(db);
    super(controller);
  }
}