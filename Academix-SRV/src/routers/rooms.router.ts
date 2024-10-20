import { RoomsController } from '../controllers/rooms.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Rooms } from '../models/Room';

export class RoomsRouter extends BaseHttpRouter<Rooms> {
  constructor() {
    const controller = new RoomsController();
    super(controller);
  }
}