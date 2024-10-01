import { Pool } from 'pg';
import { BaseHttpService } from './basehttp.service';
import { Establishment } from '../models/Establishment';

export class EstablishmentService extends BaseHttpService<Establishment> {
  constructor(db: Pool) {
    super(db, 'establishment');
  }
}