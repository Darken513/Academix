import { CenterReferedUser } from '../models/centerReferedUser';
import { CenterReferedUserService } from '../services/centerReferedUser.service';
import { BaseHttpController } from './basehttp.controller';

export class CenterReferedUserController extends BaseHttpController<CenterReferedUser> {
  constructor() {
    const service = new CenterReferedUserService();
    super(service);
  }
}