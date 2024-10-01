import { Pool } from 'pg';
import { RoomsController } from '../controllers/rooms.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Rooms } from '../models/Rooms';

export class RoomsRouter extends BaseHttpRouter<Rooms> {
  constructor(db: Pool) {
    const controller = new RoomsController(db);
    super(controller);
  }
}