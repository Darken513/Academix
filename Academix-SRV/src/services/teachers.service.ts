import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Teacher } from '../models/userRoles/Teacher';

export class TeacherService extends BaseHttpService<Teacher> {
  constructor() {
    super(DATA_SOURCE.getRepository(Teacher));
  }
}