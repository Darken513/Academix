import { BaseHttpService } from './basehttp.service';
import { CoursStudent } from '../models/CoursStudent';
import { DATA_SOURCE } from '../db/dataSource';
import { Cours } from '../models/Cours';
import { Student } from '../models/userRoles/Student';
import { Repository } from 'typeorm';

export class CoursStudentService extends BaseHttpService<CoursStudent> {
  constructor() {
    super(DATA_SOURCE.getRepository(CoursStudent));
  }

  public async createCoursStudent(
    data: Partial<CoursStudent> & { cours_id: number, student_id: number }
  ): Promise<CoursStudent> {
    const coursRepository: Repository<Cours> = DATA_SOURCE.getRepository(Cours);
    const studentRepository: Repository<Student> = DATA_SOURCE.getRepository(Student);

    // Fetch the Student and Session entities based on provided IDs
    const cours = await coursRepository.findOne({ where: { id: data.cours_id } });
    const student = await studentRepository.findOne({ where: { id: data.student_id } });

    
    if (!cours) {
      console.log('Cours not found')
      throw new Error('Cours not found');
    }
    if (!student) {
      console.log('Student not found')
      throw new Error('Student not found');
    }
  
    // Create the Attendance entity and set relationships
    const coursStudent = this.repository.create({
      ...data,
      cours: cours,
      student: student,
    });
  
    // Save and return the entity
    return await this.repository.save(coursStudent);
  }
}