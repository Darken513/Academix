import { RoomsController } from '../controllers/rooms.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Room } from '../models/Room';

export class RoomsRouter extends BaseHttpRouter<Room> {
  constructor() {
    const controller = new RoomsController();
    super(controller);
    this.router.get('/byDate/:sessionId/:date/:startTime/:endTime', (req, res) => controller.getAvailableRoomsInTimeInterval(req, res));
  }
}