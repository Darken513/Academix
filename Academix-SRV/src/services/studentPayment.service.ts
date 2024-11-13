import { BaseHttpService } from './basehttp.service';
import { StudentPayment } from '../models/StudentPayment';
import { DATA_SOURCE } from '../db/dataSource';
import { CoursStudent } from '../models/CoursStudent';
import { Repository } from 'typeorm';

export class StudentPaymentService extends BaseHttpService<StudentPayment> {
  private static instance: StudentPaymentService;

  private constructor() {
    super(DATA_SOURCE.getRepository(StudentPayment));
  }

  public static getInstance(): StudentPaymentService {
    if (!StudentPaymentService.instance) {
      StudentPaymentService.instance = new StudentPaymentService();
    }
    return StudentPaymentService.instance;
  }

  public async create(data: any): Promise<any> {
    const coursStudentRepository: Repository<CoursStudent> = DATA_SOURCE.getRepository(CoursStudent);

    const coursStudent = await coursStudentRepository.findOne({ where: { id: data.cours_student_id } });

    if (!coursStudent) {
      throw new Error('CoursStudent not found');
    }

    const StudentPayment = this.repository.create({
      ...data,
      coursStudent: coursStudent,
    });

    return await this.repository.save(StudentPayment);
  }
}