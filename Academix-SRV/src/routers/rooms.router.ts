import { RoomsController } from '../controllers/rooms.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Room } from '../models/Room';

export class RoomsRouter extends BaseHttpRouter<Room> {
  constructor() {
    const controller = new RoomsController();
    super(controller);
    this.router.get('/rooms', (req, res) => controller.getAllRooms(req, res));
    this.router.get('/rooms/:id', (req, res) => controller.getRoomById(req, res));
    this.router.get('/rooms/capacities', (req, res) => controller.getRoomCapacities(req, res));


    
  }
}