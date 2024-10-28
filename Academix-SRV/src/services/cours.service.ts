import { BaseHttpService } from './basehttp.service';
import { Cours } from '../models/Cours';
import { DATA_SOURCE } from '../db/dataSource';
import { Subject } from '../models/Subject';
import { Teacher } from '../models/userRoles/Teacher';
import { Repository } from 'typeorm';

export class CoursService extends BaseHttpService<Cours> {
  constructor() {
    super(DATA_SOURCE.getRepository(Cours));
  }

  public async createCours(
    data: Partial<Cours> & { subject_id: number, teacher_id: number }
  ): Promise<Cours> {
    const subjectRepository: Repository<Subject> = DATA_SOURCE.getRepository(Subject);
    const teacherRepository: Repository<Teacher> = DATA_SOURCE.getRepository(Teacher);

    // Fetch the Student and Session entities based on provided IDs
    const subject = await subjectRepository.findOne({ where: { id: data.subject_id } });
    const teacher = await teacherRepository.findOne({ where: { id: data.teacher_id } });

    
    if (!subject) {
      console.log('Subject not found')
      throw new Error('Subject not found');
    }
    if (!teacher) {
      console.log('Teacher not found')
      throw new Error('Teacher not found');
    }
  
    // Create the Attendance entity and set relationships
    const Cours = this.repository.create({
      ...data,
      subject: subject,
      teacher: teacher,
    });
  
    // Save and return the entity
    return await this.repository.save(Cours);
  }
}