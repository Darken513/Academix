import { BaseHttpService } from './basehttp.service';
import { TeachersSubjects } from '../models/TeachersSubjects';
import { DATA_SOURCE } from '../db/dataSource';

export class TeachersSubjectsService extends BaseHttpService<TeachersSubjects> {
  constructor() {
    super(DATA_SOURCE.getRepository(TeachersSubjects));
  }
}