import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/userRoles/User';

export class UserController extends BaseHttpController<User> {
  constructor() {
    const service = UserService.getInstance();
    super(service);
  }
}