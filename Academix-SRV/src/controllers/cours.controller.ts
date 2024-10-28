import { CoursService } from '../services/cours.service';
import { BaseHttpController } from './basehttp.controller';
import { Cours } from '../models/Cours';
import { Request, Response } from 'express';

export class CoursController extends BaseHttpController<Cours> {
  constructor() {
    const service = new CoursService();
    super(service);
  }

  async createCours(req: Request, res: Response): Promise<void> {
    try {
      const def = await (this.service as CoursService).createCours(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
}
}