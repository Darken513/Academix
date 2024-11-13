import { RoomsService } from '../services/rooms.service';
import { BaseHttpController } from './basehttp.controller';
import { Room } from '../models/Room';
import { Request, Response } from 'express';
import { SessionsService } from '../services/sessions.service';

export class RoomsController extends BaseHttpController<Room> {
  //todo-achraf
  /* ignoreFields = []
  DAOMapper = {
    'admin' : ['name', 'capacity'],
    'teacher' : ['name', 'capacity'],
    'student' : ['name', 'capacity'],
    'parent' : ['name', 'capacity'],
    'any' :['name', 'capacity']
  } */
  constructor() {
    const service = RoomsService.getInstance();
    super(service);
  }

  async getAvailableRoomsInTimeInterval(req: Request, res: Response) {

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
      const availableRoomInIntervalTime = await (this.service as RoomsService).getAvailableRoomsInTimeInterval(date,startTime,endTime);
      return res.status(200).json(availableRoomInIntervalTime);
    } catch (error) {
      return res.status(500).json({ message: "An error occurred while fetching sessions", error });
    }
  }
}