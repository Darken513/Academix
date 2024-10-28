import { BaseHttpService } from './basehttp.service';
import { StudentPayment } from '../models/StudentPayment';
import { DATA_SOURCE } from '../db/dataSource';
import { CoursStudent } from '../models/CoursStudent';
import { Repository } from 'typeorm';

export class StudentPaymentService extends BaseHttpService<StudentPayment> {
  constructor() {
    super(DATA_SOURCE.getRepository(StudentPayment));
  }

  public async createStudentPayment(
    data: Partial<StudentPayment> & { cours_student_id: number }
  ): Promise<StudentPayment> {
    const coursStudentRepository: Repository<CoursStudent> = DATA_SOURCE.getRepository(CoursStudent);

    // Fetch the Student and Session entities based on provided IDs
    const coursStudent = await coursStudentRepository.findOne({ where: { id: data.cours_student_id } });

    
    if (!coursStudent) {
      console.log('CoursStudent not found')
      throw new Error('CoursStudent not found');
    }
  
    // Create the Attendance entity and set relationships
    const StudentPayment = this.repository.create({
      ...data,
      coursStudent: coursStudent,
    });
  
    // Save and return the entity
    return await this.repository.save(StudentPayment);
  }
}