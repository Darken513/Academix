import { Pool } from 'pg';
import { RoomsService } from '../services/rooms.service';
import { BaseHttpController } from './basehttp.controller';
import { Rooms } from '../models/Rooms';

export class RoomsController extends BaseHttpController<Rooms> {
  constructor(db: Pool) {
    const service = new RoomsService(db);
    super(service);
  }
}