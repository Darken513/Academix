import { EstablishmentService } from '../services/establishment.service';
import { BaseHttpController } from './basehttp.controller';
import { Establishment } from '../models/Establishment';

export class EstablishmentController extends BaseHttpController<Establishment> {
  constructor() {
    const service = new EstablishmentService();
    super(service);
  }
}