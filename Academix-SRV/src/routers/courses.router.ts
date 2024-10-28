import { CoursController } from '../controllers/cours.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Cours } from '../models/Cours';

export class CoursRouter extends BaseHttpRouter<Cours> {
  constructor() {
    const controller = new CoursController();
    super(controller);

    // /courses/createCourse
    this.router.post('/createCours', (req, res) => controller.createCours(req, res));
  }
}