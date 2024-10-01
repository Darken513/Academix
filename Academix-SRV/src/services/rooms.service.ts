import { Pool } from 'pg';
import { BaseHttpService } from './basehttp.service';
import { Rooms } from '../models/Rooms';

export class RoomsService extends BaseHttpService<Rooms> {
  constructor(db: Pool) {
    super(db, 'rooms');
  }
}