import { BaseHttpService } from './basehttp.service';
import { Establishment } from '../models/Establishment';
import { DATA_SOURCE } from '../db/dataSource';

export class EstablishmentService extends BaseHttpService<Establishment> {
  constructor() {
    super(DATA_SOURCE.getRepository(Establishment));
  }
}