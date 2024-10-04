import { UserController } from '../controllers/user.controller';
import { BaseHttpRouter } from './basehttp.router';
import { User } from '../models/User';

export class UsersRouter extends BaseHttpRouter<User> {
  constructor() {
    const controller = new UserController();
    super(controller);
  }
}