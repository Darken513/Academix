import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/User';

export class UserController extends BaseHttpController<User> {
  constructor() {
    const service = new UserService();
    super(service);
  }
}