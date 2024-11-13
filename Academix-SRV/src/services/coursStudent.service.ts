import { BaseHttpService } from './basehttp.service';
import { CoursStudent } from '../models/CoursStudent';
import { DATA_SOURCE } from '../db/dataSource';
import { Cours } from '../models/Cours';
import { Student } from '../models/userRoles/Student';
import { Repository } from 'typeorm';

export class CoursStudentService extends BaseHttpService<CoursStudent> {
  private static instance: CoursStudentService;

  private constructor() {
    super(DATA_SOURCE.getRepository(CoursStudent));
  }

  public static getInstance(): CoursStudentService {
    if (!CoursStudentService.instance) {
      CoursStudentService.instance = new CoursStudentService();
    }
    return CoursStudentService.instance;
  }

  public async create(data: any): Promise<any> {
    const coursRepository: Repository<Cours> = DATA_SOURCE.getRepository(Cours);
    const studentRepository: Repository<Student> = DATA_SOURCE.getRepository(Student);

    const cours = await coursRepository.findOne({ where: { id: data.cours_id } });
    const student = await studentRepository.findOne({ where: { id: data.student_id } });

    if (!cours) {
      throw new Error('Cours not found');
    }
    if (!student) {
      throw new Error('Student not found');
    }

    const coursStudent = this.repository.create({
      ...data,
      cours: cours,
      student: student,
    });

    return await this.repository.save(coursStudent);
  }
}