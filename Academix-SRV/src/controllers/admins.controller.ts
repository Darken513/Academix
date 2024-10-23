import { AdminService } from '../services/admins.service';
import { BaseHttpController } from './basehttp.controller';
import { Admin } from '../models/userRoles/Admin';

export class AdminController extends BaseHttpController<Admin> {
  constructor() {
    const service = new AdminService();
    super(service);
  }
}