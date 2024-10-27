import { BaseHttpService } from './basehttp.service';
import { Attendance } from '../models/Attendance';
import { DATA_SOURCE } from '../db/dataSource';
import { Repository } from 'typeorm';
import { Student } from '../models/userRoles/Student';
import { Session } from '../models/Session';

export class AttendanceService extends BaseHttpService<Attendance> {
  constructor() {
    super(DATA_SOURCE.getRepository(Attendance));
  }

  public async createAttendance(
    data: Partial<Attendance> & { student_id: number, session_id: number }
  ): Promise<Attendance> {
    const studentRepository: Repository<Student> = DATA_SOURCE.getRepository(Student);
    const sessionRepository: Repository<Session> = DATA_SOURCE.getRepository(Session);

    // Fetch the Student and Session entities based on provided IDs
    const student = await studentRepository.findOne({ where: { id: data.student_id } });
    const session = await sessionRepository.findOne({ where: { id: data.session_id } });

    
    if (!student) {
      console.log('Student not found')
      throw new Error('Student not found');
    }
    if (!session) {
      console.log('Session not found')
      throw new Error('Session not found');
    }
  
    // Create the Attendance entity and set relationships
    const attendance = this.repository.create({
      ...data,
      student: student,
      sessions: session,
    });
  
    // Save and return the entity
    return await this.repository.save(attendance);
  }
  
  // Custom method to fetch attendance records by student ID
  async getAttendanceByStudent(studentId: number): Promise<Attendance[]> {
    return this.repository.find({
      where: { student: { id: studentId } },  // Query using the relation, not the foreign key directly
      relations: ['student'],  // Optionally fetch related data
    });
  }
}