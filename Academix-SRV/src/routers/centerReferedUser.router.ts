import { CenterReferedUserController } from '../controllers/centerReferedUser.controller';
import { CenterReferedUser } from '../models/centerReferedUser';
import { BaseHttpRouter } from './basehttp.router';

export class CenterReferedUserRouter extends BaseHttpRouter<CenterReferedUser> {
  constructor() {
    const controller = new CenterReferedUserController();
    super(controller);

    // /centerReferedUser/createCenterReferedUser
    this.router.post('/createCenterReferedUser', (req, res) => controller.createCenterReferedUser(req, res));
  }
}