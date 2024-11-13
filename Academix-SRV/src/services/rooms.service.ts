import { BaseHttpService } from './basehttp.service';
import { Room } from '../models/Room';
import { DATA_SOURCE } from '../db/dataSource';
import { getRepository } from 'typeorm';

export class RoomsService extends BaseHttpService<Room> {
  constructor() {
    super(DATA_SOURCE.getRepository(Room));
  }
  
  async getAllRooms(): Promise<Room[]> {
    return DATA_SOURCE.getRepository(Room).find();
  }

  async getRoomById(id: number): Promise<Room | null> {  
    return DATA_SOURCE.getRepository(Room).findOne({ where: { id } });
  }

  async getRoomCapacities(): Promise<Room[]> {
    return DATA_SOURCE.getRepository(Room).find({
      select: ['id', 'name', 'capacity'],
    });
  }
}