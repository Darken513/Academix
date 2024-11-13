import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Parent } from '../models/userRoles/Parent';

export class ParentService extends BaseHttpService<Parent> {
  private static instance: ParentService;
  
  private constructor() {
    super(DATA_SOURCE.getRepository(Parent));
  }

  public static getInstance(): ParentService {
    if (!ParentService.instance) {
      ParentService.instance = new ParentService();
    }
    return ParentService.instance;
  }
}