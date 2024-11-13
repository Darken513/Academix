import { BaseHttpService } from './basehttp.service';
import { Subject } from '../models/Subject';
import { DATA_SOURCE } from '../db/dataSource';

export class SubjectService extends BaseHttpService<Subject> {
  private static instance: SubjectService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Subject));
  }

  public static getInstance(): SubjectService {
    if (!SubjectService.instance) {
      SubjectService.instance = new SubjectService();
    }
    return SubjectService.instance;
  }
}