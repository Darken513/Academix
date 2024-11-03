import { UserController } from '../controllers/user.controller';
import { BaseHttpRouter } from './basehttp.router';
import { User } from '../models/userRoles/User';

export class UsersRouter extends BaseHttpRouter<User> {
  constructor() {
    const controller = new UserController();
    super(controller);
    this.router.post('/register/', (req, res) => controller.register(req, res));
    this.router.post('/login/', (req, res) => controller.login(req, res));
  }
}