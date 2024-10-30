import { CenterReferedUserController } from '../controllers/centerReferedUser.controller';
import { CenterReferedUser } from '../models/centerReferedUser';
import { BaseHttpRouter } from './basehttp.router';

export class CenterReferedUserRouter extends BaseHttpRouter<CenterReferedUser> {
  constructor() {
    const controller = new CenterReferedUserController();
    super(controller);
  }
}