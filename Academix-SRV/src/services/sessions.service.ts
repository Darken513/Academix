import { BaseHttpService } from './basehttp.service';
import { Session } from '../models/Session';
import { DATA_SOURCE } from '../db/dataSource';
import { Repository } from 'typeorm';
import { Rooms } from '../models/Room';

export class SessionsService extends BaseHttpService<Session> {
  constructor() {
    super(DATA_SOURCE.getRepository(Session));
  }

  public async create(data: any): Promise<any> {
    const roomsRepository: Repository<Rooms> = DATA_SOURCE.getRepository(Rooms);

    const room = await roomsRepository.findOneBy({ id: data.room_id });

    if (!room) {
      throw new Error('Room not found');
    }

    const session = this.repository.create({
      ...data,
      room: room,
    });

    return await this.repository.save(session);
  }
}