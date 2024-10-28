import { CenterReferedUserService } from '../services/centerReferedUser.service';
import { BaseHttpController } from './basehttp.controller';
import { CenterReferedUser } from '../models/centerReferedUser';
import { Request, Response } from 'express';

export class CenterReferedUserController extends BaseHttpController<CenterReferedUser> {
  constructor() {
    const service = new CenterReferedUserService();
    super(service);
  }

  async createCenterReferedUser(req: Request, res: Response): Promise<void> {
    try {
      const def = await (this.service as CenterReferedUserService).createCenterReferedUser(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
}
}