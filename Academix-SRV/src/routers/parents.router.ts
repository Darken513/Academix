import { ParentController } from '../controllers/parents.controller';
import { Parent } from '../models/userRoles/Parent';
import { BaseHttpRouter } from './basehttp.router';

export class ParentsRouter extends BaseHttpRouter<Parent> {
  constructor() {
    const controller = new ParentController();
    super(controller);
  }
}