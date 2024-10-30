import { BaseHttpService } from './basehttp.service';
import { DATA_SOURCE } from '../db/dataSource';
import { Cours } from '../models/Cours';
import { Teacher } from '../models/userRoles/Teacher';
import { Student } from '../models/userRoles/Student';
import { Repository } from 'typeorm';
import { CenterReferedUser } from '../models/centerReferedUser';

export class CenterReferedUserService extends BaseHttpService<CenterReferedUser> {
  constructor() {
    super(DATA_SOURCE.getRepository(CenterReferedUser));
  }

  public async create(data: any): Promise<any> {
    const coursRepository: Repository<Cours> = DATA_SOURCE.getRepository(Cours);
    const teacherRepository: Repository<Teacher> = DATA_SOURCE.getRepository(Teacher);
    const studentRepository: Repository<Student> = DATA_SOURCE.getRepository(Student);

    const cours = await coursRepository.findOne({ where: { id: data.cours_id } });
    const teacher = await teacherRepository.findOne({ where: { id: data.teacher_id } });
    const student = await studentRepository.findOne({ where: { id: data.student_id } });
    
    if (!cours) {
      throw new Error('Cours not found');
    }
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    if (!student) {
      throw new Error('Student not found');
    }
  
    const centerReferedUser = this.repository.create({
      ...data,
      cours: cours,
      teacher: teacher,
      student: student,
    });
  
    return await this.repository.save(centerReferedUser);
  }
}
