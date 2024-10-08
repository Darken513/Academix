import { CoursService } from '../services/cours.service';
import { BaseHttpController } from './basehttp.controller';
import { Cours } from '../models/Cours';

export class CoursController extends BaseHttpController<Cours> {
  constructor() {
    const service = new CoursService();
    super(service);
  }
}