import { BaseHttpService } from './basehttp.service';
import { Rooms } from '../models/Rooms';
import { DATA_SOURCE } from '../db/dataSource';

export class RoomsService extends BaseHttpService<Rooms> {
  constructor() {
    super(DATA_SOURCE.getRepository(Rooms));
  }
}