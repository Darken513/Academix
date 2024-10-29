import { BaseHttpService } from './basehttp.service';
import { Room } from '../models/Room';
import { DATA_SOURCE } from '../db/dataSource';

export class RoomsService extends BaseHttpService<Room> {
  constructor() {
    super(DATA_SOURCE.getRepository(Room));
  }
}