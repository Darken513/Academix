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

  async getSessionsByRoom(req: Request, res: Response) {
    const roomId = parseInt(req.params.roomId as string);

    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Invalid Room ID" });
    }

    try {
      const sessionsByRoom = await (this.service as SessionsService).getSessionsByRoom(roomId);
      return res.status(200).json(sessionsByRoom);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching sessions", error });
    }
  }

  async getSessionsInTimeInterval(req: Request, res: Response) {
    const sessionId = parseInt(req.params.sessionID as string);

    const dateParam = req.params.date as string;
    const date = new Date(dateParam);

    
    const startTimeParam = req.params.startTime as string;
    const startTime = new Date(startTimeParam);

    const endTimeParam = req.params.endTime as string;
    const endTime = new Date(endTimeParam);

    if (isNaN(date.getTime())) { 
      return res.status(400).json({ message: "Invalid date" });
    }

    if (isNaN(startTime.getTime())) { 
      return res.status(400).json({ message: "Invalid start time" });
    }

    if (isNaN(endTime.getTime())) { 
      return res.status(400).json({ message: "Invalid end time " });
    }

    try {
      const sessionsByIntervalTime = await (this.service as SessionsService).getSessionsInTimeInterval(date,startTime,endTime);
      return res.status(200).json(sessionsByIntervalTime);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching sessions", error });
    }
  }

  async updateSessionDates(req: Request, res: Response) {
    const sessionId = parseInt(req.params.sessionId as string);

    const dateParam = req.params.date as string;
    const date = new Date(dateParam);

    
    const startTimeParam = req.params.startTime as string;
    const startTime = new Date(startTimeParam);

    const endTimeParam = req.params.date as string;
    const endTime = new Date(endTimeParam);
    
    if (isNaN(sessionId)) {
      return res.status(400).json({ message: "Invalid session ID" });
    }

    const existingSession = await  (this.service as SessionsService).sessionExists(sessionId);
    
    if (!existingSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (isNaN(date.getTime())) { 
      return res.status(400).json({ message: "Invalid date" });
    }

    if (isNaN(startTime.getTime())) { 
      return res.status(400).json({ message: "Invalid start time" });
    }

    if (isNaN(endTime.getTime())) { 
      return res.status(400).json({ message: "Invalid end time " });
    }

    try {
      const sessionsByDate = await (this.service as SessionsService).updateSessionDates(sessionId,date,startTime,endTime);
      return res.status(200).json(sessionsByDate);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching sessions", error });
    }
  }
}