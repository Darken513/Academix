import { Pool } from 'pg';
import { EstablishmentController } from '../controllers/establishment.controller';
import { BaseHttpRouter } from './basehttp.router';
import { Establishment } from '../models/Establishment';

export class EstablishmentRouter extends BaseHttpRouter<Establishment> {
  constructor(db: Pool) {
    const controller = new EstablishmentController(db);
    super(controller);
  }
}