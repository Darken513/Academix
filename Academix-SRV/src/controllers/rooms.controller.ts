import { RoomsService } from '../services/rooms.service';
import { BaseHttpController } from './basehttp.controller';
import { Rooms } from '../models/Room';

export class RoomsController extends BaseHttpController<Rooms> {
  constructor() {
    const service = new RoomsService();
    super(service);
  }
}