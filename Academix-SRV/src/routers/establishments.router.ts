import { EstablishmentController } from '../controllers/establishment.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Establishment } from '../models/Establishment';

export class EstablishmentRouter extends BaseHttpRouter<Establishment> {
  constructor() {
    const controller = new EstablishmentController();
    super(controller);
  }
}