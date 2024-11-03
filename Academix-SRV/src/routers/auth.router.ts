import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export class AuthRouter {
  public router: Router = Router();

  constructor() {
    const controller = new AuthController();
    this.router.post('/register/', (req, res) => controller.register(req, res));
    this.router.post('/login/', (req, res) => controller.login(req, res));
  }
}