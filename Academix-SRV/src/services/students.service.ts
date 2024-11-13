import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Student } from '../models/userRoles/Student';
import { Establishment } from '../models/Establishment';
import { Parent } from '../models/userRoles/Parent';
import { Repository } from 'typeorm';

export class StudentService extends BaseHttpService<Student> {
  private static instance: StudentService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Student));
  }

  public static getInstance(): StudentService {
    if (!StudentService.instance) {
      StudentService.instance = new StudentService();
    }
    return StudentService.instance;
  }

  public async create(data: Student): Promise<Student> {
    const establishmentRepository: Repository<Establishment> = DATA_SOURCE.getRepository(Establishment);
    const parentRepository: Repository<Parent> = DATA_SOURCE.getRepository(Parent);

    const establishment = await establishmentRepository.findOne({ where: { id: (data as any).establishment_id } });
    const parent = await parentRepository.findOne({ where: { id: (data as any).parent_id } });
    
    if (!establishment) {
      throw new Error('Establishment not found');
    }
    if (!parent) {
      throw new Error('Parent not found');
    }

    const student = this.repository.create({
      ...data,
      establishment: establishment,
      parent: parent,
    });

    return await this.repository.save(student);
  }
}