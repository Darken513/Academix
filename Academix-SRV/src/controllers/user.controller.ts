import { UserService } from '../services/user.service';
import { BaseHttpController } from './basehttp.controller';
import { User } from '../models/userRoles/User';
import { Request, Response } from 'express';

export class UserController extends BaseHttpController<User> {
  constructor() {
    const service = UserService.getInstance();
    super(service);
  }

  async getUserRole(req: Request, res: Response) {
    try {
      const UserRoles = (this.service as UserService).getUserRole();
      return res.status(200).json(UserRoles);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "An error occurred while fetching attendance", error });
    }
  }
}