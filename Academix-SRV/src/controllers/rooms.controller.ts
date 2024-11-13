import { RoomsService } from '../services/rooms.service';
import { BaseHttpController } from './basehttp.controller';
import { Room } from '../models/Room';

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
    const service = new RoomsService();
    super(service, /* DAOMapper */);
  }

  async getAllRooms(req: Request, res: Response) {
    try {
      const rooms = await this.service.getAllRooms();
      if (rooms.length === 0) {  // `.length` is safe here
        return res.status(404).json({ message: "No rooms found" });
      }
      return res.status(200).json(rooms);
    } catch (error) {
      console.log("Error fetching rooms:", error);
      return res.status(500).json({ message: "An error occurred while fetching rooms", error });
    }
  }

  async getRoomById(req: Request, res: Response) {
    const roomId = parseInt(req.params.id);
    if (isNaN(roomId)) {
      return res.status(400).json({ message: "Invalid room ID" });
    }
    try {
      const room = await this.service.getRoomById(roomId);
      if (!room) {  
        return res.status(404).json({ message: "Room not found" });
      }
      return res.status(200).json(room);
    } catch (error) {
      console.log("Error fetching room:", error);
      return res.status(500).json({ message: "An error occurred while fetching the room", error });
    }
  }

  async getRoomCapacities(req: Request, res: Response) {
    try {
      const rooms = await this.service.getRoomCapacities();
      return res.status(200).json(rooms);
    } catch (error) {
      console.log("Error fetching room capacities:", error);
      return res.status(500).json({ message: "An error occurred while fetching room capacities", error });
    }
  }
}