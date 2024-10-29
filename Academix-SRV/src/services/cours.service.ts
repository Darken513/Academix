import { BaseHttpService } from './basehttp.service';
import { Cours } from '../models/Cours';
import { DATA_SOURCE } from '../db/dataSource';

export class CoursService extends BaseHttpService<Cours> {
  constructor() {
    super(DATA_SOURCE.getRepository(Cours));
  }

  async getCoursesByTeacher(teacherId: number): Promise<Cours[]> {
    return this.repository.find({
      where: { teacher: { id: teacherId }},
      relations: ['teacher'],
    });
  }
}