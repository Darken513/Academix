import { Parent } from '../models/userRoles/Parent';
import { ParentService } from '../services/parents.service';
import { BaseHttpController } from './basehttp.controller';

export class ParentController extends BaseHttpController<Parent> {
  constructor() {
    const service = new ParentService();
    super(service);
  }
}