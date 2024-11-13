import { BaseHttpService } from './basehttp.service';
import { Establishment } from '../models/Establishment';
import { DATA_SOURCE } from '../db/dataSource';

export class EstablishmentService extends BaseHttpService<Establishment> {
  private static instance: EstablishmentService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Establishment));
  }

  public static getInstance(): EstablishmentService {
    if (!EstablishmentService.instance) {
      EstablishmentService.instance = new EstablishmentService();
    }
    return EstablishmentService.instance;
  }
}