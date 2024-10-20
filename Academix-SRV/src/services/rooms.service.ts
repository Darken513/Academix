import { BaseHttpService } from './basehttp.service';
import { Rooms } from '../models/Room';
import { DATA_SOURCE } from '../db/dataSource';

export class RoomsService extends BaseHttpService<Rooms> {
  constructor() {
    super(DATA_SOURCE.getRepository(Rooms));
  }
}