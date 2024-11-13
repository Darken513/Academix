import { BaseHttpService } from './basehttp.service';
import { Room } from '../models/Room';
import { DATA_SOURCE } from '../db/dataSource';
import { SessionsService } from './sessions.service';

export class RoomsService extends BaseHttpService<Room> {
  private static instance: RoomsService;
  sessionService: SessionsService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Room));
    this.sessionService = SessionsService.getInstance();
  }

  public static getInstance(): RoomsService {
    if (!RoomsService.instance) {
      RoomsService.instance = new RoomsService();
    }
    return RoomsService.instance;
  }

  async getAvailableRoomsInTimeInterval(date: Date, startTime: Date, endTime: Date): Promise<Room[]> {
    const ongoingSessions = await this.sessionService.getSessionsInTimeInterval(date, startTime, endTime)
    const occupiedRoomIds = ongoingSessions.map((session) => session.room);
    return this.repository.createQueryBuilder('room')
      .where('room.id NOT IN (:...occupiedRoomIds)', { occupiedRoomIds }).getMany()
  }

}