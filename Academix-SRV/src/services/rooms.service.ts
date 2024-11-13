import { BaseHttpService } from './basehttp.service';
import { Room } from '../models/Room';
import { DATA_SOURCE } from '../db/dataSource';

export class RoomsService extends BaseHttpService<Room> {
  private static instance: RoomsService;
  
  private constructor() {
    super(DATA_SOURCE.getRepository(Room));
  }

  public static getInstance(): RoomsService {
    if (!RoomsService.instance) {
      RoomsService.instance = new RoomsService();
    }
    return RoomsService.instance;
  }
}