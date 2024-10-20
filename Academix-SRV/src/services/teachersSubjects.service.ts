import { BaseHttpService } from './basehttp.service';
import { TeacherSubject } from '../models/TeacherSubject';
import { DATA_SOURCE } from '../db/dataSource';

export class TeachersSubjectsService extends BaseHttpService<TeacherSubject> {
  constructor() {
    super(DATA_SOURCE.getRepository(TeacherSubject));
  }
}