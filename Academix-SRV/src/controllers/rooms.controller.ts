import { RoomsService } from '../services/rooms.service';
import { BaseHttpController } from './basehttp.controller';
import { Room } from '../models/Room';

export class RoomsController extends BaseHttpController<Room> {
  //todo-achraf
  /* ignoreFields = []
  DAOMapper = {
    'admin' : ['name', 'capacity'],
    'teacher' : ['name', 'capacity'],
    'student' : ['name', 'capacity'],
    'parent' : ['name', 'capacity'],
    'any' :['name', 'capacity']
  } */
  constructor() {
    const service = new RoomsService();
    super(service, /* DAOMapper */);
  }
}