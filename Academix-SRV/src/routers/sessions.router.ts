import { SessionsController } from '../controllers/sessions.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Session } from '../models/Session';

export class SessionsRouter extends BaseHttpRouter<Session> {
  constructor() {
    const controller = new SessionsController();
    super(controller);
    this.router.get('/byCours/:coursId', (req, res) => controller.getSessionsByCours(req, res));
    this.router.get('/byDate/:date', (req, res) => controller.getSessionsByDate(req, res));
    this.router.get('/byDate/:date/:startTime/:endDate', (req, res) => controller.getSessionsInTimeInterval(req, res));
    this.router.get('/byRoom/:roomId', (req, res) => controller.getSessionsByRoom(req, res));
    this.router.post('/byDate/:sessionId/:date/:startTime/:endDate', (req, res) => controller.updateSessionDates(req, res));
  }
}