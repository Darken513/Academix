import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Teacher } from '../models/userRoles/Teacher';
import { Establishment } from '../models/Establishment';
import { Repository } from 'typeorm';

export class TeacherService extends BaseHttpService<Teacher> {
  private static instance: TeacherService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Teacher));
  }

  public static getInstance(): TeacherService {
    if (!TeacherService.instance) {
      TeacherService.instance = new TeacherService();
    }
    return TeacherService.instance;
  }

  public async create(data: Teacher): Promise<Teacher> {
    const establishmentRepository: Repository<Establishment> = DATA_SOURCE.getRepository(Establishment);

    const establishment = await establishmentRepository.findOne({ where: { id: (data as any).establishment_id } });
    
    if (!establishment) {
      throw new Error('Establishment not found');
    }

    const teacher = this.repository.create({
      ...data,
      establishment: establishment,
    });

    return await this.repository.save(teacher);
  }
}