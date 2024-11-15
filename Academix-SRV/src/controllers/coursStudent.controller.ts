import { CoursStudentService } from '../services/coursStudent.service';
import { BaseHttpController } from './basehttp.controller';
import { CoursStudent } from '../models/CoursStudent';
import { Response } from 'express';

export class CoursStudentController extends BaseHttpController<CoursStudent> {
  constructor() {
    const service = CoursStudentService.getInstance();
    super(service);
  }
}