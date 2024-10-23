import { AdminController } from '../controllers/admins.controller';
import { Admin } from '../models/userRoles/Admin';
import { BaseHttpRouter } from './basehttp.router';

export class AdminsRouter extends BaseHttpRouter<Admin> {
  constructor() {
    const controller = new AdminController();
    super(controller);
  }
}