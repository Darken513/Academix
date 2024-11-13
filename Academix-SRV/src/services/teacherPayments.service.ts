import { BaseHttpService } from './basehttp.service';
import { TeacherPayment } from '../models/TeacherPayment';
import { DATA_SOURCE } from '../db/dataSource';
import { Teacher } from '../models/userRoles/Teacher';
import { Cours } from '../models/Cours';
import { Repository } from 'typeorm';

export class TeacherPaymentsService extends BaseHttpService<TeacherPayment> {
  private static instance: TeacherPaymentsService;

  private constructor() {
    super(DATA_SOURCE.getRepository(TeacherPayment));
  }

  public static getInstance(): TeacherPaymentsService {
    if (!TeacherPaymentsService.instance) {
      TeacherPaymentsService.instance = new TeacherPaymentsService();
    }
    return TeacherPaymentsService.instance;
  }

  public async create(data: any): Promise<any> {
    const teacherRepository: Repository<Teacher> = DATA_SOURCE.getRepository(Teacher);
    const coursRepository: Repository<Cours> = DATA_SOURCE.getRepository(Cours);

    const teacher = await teacherRepository.findOne({ where: { id: data.teacher_id } });
    const cours = await coursRepository.findOne({ where: { id: data.cours_id } });

    if (!teacher) {
      throw new Error('Teacher not found');
    }

    if (!cours) {
      throw new Error('Cours not found');
    }
  
    const teacherPayment = this.repository.create({
      ...data,
      teacher: teacher,
      cours: cours,
    });
  
    return await this.repository.save(teacherPayment);
  }
}