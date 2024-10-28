import { BaseHttpService } from './basehttp.service';
import { Session } from '../models/Session';
import { DATA_SOURCE } from '../db/dataSource';
import { Rooms } from '../models/Room';
import { Cours } from '../models/Cours';
import { Repository } from 'typeorm';

export class SessionsService extends BaseHttpService<Session> {
  constructor() {
    super(DATA_SOURCE.getRepository(Session));
  }

  public async createSession(
    data: Partial<Session> & { room_id: number, cours_id: number }
  ): Promise<Session> {
    const roomRepository: Repository<Rooms> = DATA_SOURCE.getRepository(Rooms);
    const coursRepository: Repository<Cours> = DATA_SOURCE.getRepository(Cours);

    // Fetch the Student and Session entities based on provided IDs
    const room = await roomRepository.findOne({ where: { id: data.room_id } });
    const cours = await coursRepository.findOne({ where: { id: data.cours_id } });

    
    if (!room) {
      console.log('Room not found')
      throw new Error('Room not found');
    }
    if (!cours) {
      console.log('Cours not found')
      throw new Error('Cours not found');
    }
  
    // Create the Attendance entity and set relationships
    const session = this.repository.create({
      ...data,
      rooms: room,
      cours: cours,
    });
  
    // Save and return the entity
    return await this.repository.save(session);
  }
}