import { BaseHttpService } from './basehttp.service';
import { Session } from '../models/Session';
import { DATA_SOURCE } from '../db/dataSource';
import { Repository, Timestamp } from 'typeorm';
import { Room } from '../models/Room';
import { Cours } from '../models/Cours';

export class SessionsService extends BaseHttpService<Session> {
  constructor() {
    super(DATA_SOURCE.getRepository(Session));
  }
//POST

  public async create(data: any): Promise<any> {
    const roomRepository: Repository<Room> = DATA_SOURCE.getRepository(Room);
    const coursRepository: Repository<Cours> = DATA_SOURCE.getRepository(Cours);

    const room = await roomRepository.findOne({ where: { id: data.room_id } });
    const cours = await coursRepository.findOne({ where: { id: data.cours_id } });

    if (!room) {
      throw new Error('Room not found');
    }
    if (!cours) {
      throw new Error('Cours not found');
    }

    const session = this.repository.create({
      ...data,
      rooms: room,
      cours: cours,
    });

    return await this.repository.save(session);
  }

  async updateSessionDates(sessionId: number, newDate: Date, startTime: Timestamp, endTime: Timestamp): Promise<void> {
    await this.repository.update(sessionId, {
      session_date : newDate,
      start_time: startTime,
      end_time: endTime,
    });
  }
//GET
  async getSessionsByCours(coursId: number): Promise<Session[]> {
    return this.repository.find({
      where: { cours: { id: coursId } },
      relations: ['cours'],
    });
  }

  async getSessionsByDate(date: Date): Promise<Session[]> {
    return this.repository.find({
      where: {session_date: date } 
    });
  }

  async getSessionsByRoom(roomId: number): Promise<Session[]> {
    return this.repository.find({
      where: { room: { id: roomId } },
      relations: ['room'],
    });
  }

  async getSessionsInTimeInterval(startTime: Timestamp, endTime: Timestamp): Promise<Session[]> {
    return this.repository
      .createQueryBuilder('session')
      .where('session.start_time > :startTime', { startTime })
      .andWhere('session.start_time < :endTime', { endTime })
      .getMany();
  }
}