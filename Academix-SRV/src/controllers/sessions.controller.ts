import { SessionsService } from '../services/sessions.service';
import { BaseHttpController } from './basehttp.controller';
import { Session } from '../models/Session';
import { Request, Response } from 'express';

export class SessionsController extends BaseHttpController<Session> {
  constructor() {
    const service = new SessionsService();
    super(service);
  }

  async getSessionsByCours(req: Request, res: Response) {
    const coursId = parseInt(req.params.coursId as string);

    if (isNaN(coursId)) {
      return res.status(400).json({ message: "Invalid cours ID" });
    }

    try {
      const sessionsByCours = await (this.service as SessionsService).getSessionsByCours(coursId);
      return res.status(200).json(sessionsByCours);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching sessions", error });
    }
  }

  async getSessionsByDate(req: Request, res: Response) {
    const dateParam = req.params.date as string;
    const date = new Date(dateParam);

    if (isNaN(date.getTime())) { 
      return res.status(400).json({ message: "Invalid date" });
    }

    try {
      const sessionsByDate = await (this.service as SessionsService).getSessionsByDate(date);
      return res.status(200).json(sessionsByDate);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching sessions", error });
    }
  }
}