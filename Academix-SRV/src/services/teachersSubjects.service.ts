import { BaseHttpService } from './basehttp.service';
import { TeacherSubject } from '../models/TeacherSubject';
import { Teacher } from '../models/userRoles/Teacher';
import { Subject } from '../models/Subject';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../db/dataSource';

export class TeachersSubjectsService extends BaseHttpService<TeacherSubject> {
  private static instance: TeachersSubjectsService;

  private constructor() {
    super(DATA_SOURCE.getRepository(TeacherSubject));
  }

  public static getInstance(): TeachersSubjectsService {
    if (!TeachersSubjectsService.instance) {
      TeachersSubjectsService.instance = new TeachersSubjectsService();
    }
    return TeachersSubjectsService.instance;
  }

  public async create(data: TeacherSubject): Promise<TeacherSubject> {
    const teacherRepository: Repository<Teacher> = DATA_SOURCE.getRepository(Teacher);
    const subjectRepository: Repository<Subject> = DATA_SOURCE.getRepository(Subject);

    const teacher = await teacherRepository.findOne({ where: { id: (data as any).teacher_id } });
    const subject = await subjectRepository.findOne({ where: { id: (data as any).subject_id } });
    
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    if (!subject) {
      throw new Error('Subject not found');
    }

    const teacherSubject = this.repository.create({
      ...data,
      teacher: teacher,
      subject: subject,
    });

    return await this.repository.save(teacherSubject);
  }
}