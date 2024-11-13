import { BaseHttpService } from './basehttp.service';
import { Cours } from '../models/Cours';
import { DATA_SOURCE } from '../db/dataSource';
import { Subject } from '../models/Subject';
import { Teacher } from '../models/userRoles/Teacher';
import { Repository } from 'typeorm';

export class CoursService extends BaseHttpService<Cours> {
  private static instance: CoursService;

  private constructor() {
    super(DATA_SOURCE.getRepository(Cours));
  }
    
  public static getInstance(): CoursService {
    if (!CoursService.instance) {
      CoursService.instance = new CoursService();
    }
    return CoursService.instance;
  }

  public async create(data: any): Promise<any> {
    const subjectRepository: Repository<Subject> = DATA_SOURCE.getRepository(Subject);
    const teacherRepository: Repository<Teacher> = DATA_SOURCE.getRepository(Teacher);

    const subject = await subjectRepository.findOne({ where: { id: data.subject_id } });
    const teacher = await teacherRepository.findOne({ where: { id: data.teacher_id } });

    if (!subject) {
      throw new Error('Subject not found');
    }
    if (!teacher) {
      throw new Error('Teacher not found');
    }

    const Cours = this.repository.create({
      ...data,
      subject: subject,
      teacher: teacher,
    });

    return await this.repository.save(Cours);
  }

  async getCoursesByTeacher(teacherId: number): Promise<Cours[]> {
    return this.repository.find({
      where: { teacher: { id: teacherId } },
      relations: ['teacher'],
    });
  }

  async getCoursesBySubject(subjectId: number): Promise<Cours[]> {
    return this.repository.find({
      where: { subject: { id: subjectId } },
      relations: ['subject'],
    });
  }
}