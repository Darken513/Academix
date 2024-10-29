import { RoomsService } from '../services/rooms.service';
import { BaseHttpController } from './basehttp.controller';
import { Room } from '../models/Room';

export class RoomsController extends BaseHttpController<Room> {
  constructor() {
    const service = new RoomsService();
    super(service);
  }
}