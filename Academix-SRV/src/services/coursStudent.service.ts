import { BaseHttpService } from './basehttp.service';
import { CoursStudent } from '../models/CoursStudent';
import { DATA_SOURCE } from '../db/dataSource';

export class CoursStudentService extends BaseHttpService<CoursStudent> {
  constructor() {
    super(DATA_SOURCE.getRepository(CoursStudent));
  }
}