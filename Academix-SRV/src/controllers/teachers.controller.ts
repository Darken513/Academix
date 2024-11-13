import { Teacher } from '../models/userRoles/Teacher';
import { TeacherService } from '../services/teachers.service';
import { BaseHttpController } from './basehttp.controller';

export class TeacherController extends BaseHttpController<Teacher> {
  constructor() {
    const service = TeacherService.getInstance();
    super(service);
  }
}