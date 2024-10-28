import { SessionsService } from '../services/sessions.service';
import { BaseHttpController } from './basehttp.controller';
import { Session } from '../models/Session';
import { Request, Response } from 'express';

export class SessionsController extends BaseHttpController<Session> {
  constructor() {
    const service = new SessionsService();
    super(service);
  }

  async createSession(req: Request, res: Response): Promise<void> {
    try {
      const def = await (this.service as SessionsService).createSession(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
}
}