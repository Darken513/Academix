import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Admin } from '../models/userRoles/Admin';

export class AdminService extends BaseHttpService<Admin> {
  private static instance: AdminService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Admin));
  }

  public static getInstance(): AdminService {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }
}