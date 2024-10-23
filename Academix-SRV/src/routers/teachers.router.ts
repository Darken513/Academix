import { TeacherController } from '../controllers/teachers.controller';
import { Teacher } from '../models/userRoles/Teacher';
import { BaseHttpRouter } from './basehttp.router';

export class TeachersRouter extends BaseHttpRouter<Teacher> {
  constructor() {
    const controller = new TeacherController();
    super(controller);
  }
}