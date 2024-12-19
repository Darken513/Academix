import { UserController } from '../controllers/user.controller';
import { BaseHttpRouter } from './basehttp.router';
import { User } from '../models/userRoles/User';

export class UsersRouter extends BaseHttpRouter<User> {
  constructor() {
    const controller = new UserController();
    super(controller);
    this.router.get('/getUserRole', (req, res) => controller.getUserRole(req, res));
  }
}