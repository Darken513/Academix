import { Pool } from 'pg';
import { EstablishmentService } from '../services/establishment.service';
import { BaseHttpController } from './basehttp.controller';
import { Establishment } from '../models/Establishment';

export class EstablishmentController extends BaseHttpController<Establishment> {
  constructor(db: Pool) {
    const service = new EstablishmentService(db);
    super(service);
  }
}