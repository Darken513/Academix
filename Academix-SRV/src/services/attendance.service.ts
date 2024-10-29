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

  public async create(data: Attendance): Promise<Attendance> {
    const studentRepository: Repository<Student> = DATA_SOURCE.getRepository(Student);
    const sessionRepository: Repository<Session> = DATA_SOURCE.getRepository(Session);

    // Fetch the Student and Session entities based on provided IDs
    const student = await studentRepository.findOne({ where: { id: (data as any).student_id } });
    const session = await sessionRepository.findOne({ where: { id: (data as any).session_id } });

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
      session: session,
    });

    // Save and return the entity
    return await this.repository.save(attendance);
  }

  async getByStudentAndSession(studentId: number, sessionId: number): Promise<Attendance[]> {
    return this.repository.find({
      where: { student: { id: studentId }, session: { id: sessionId } },
      relations: ['student', 'sessions'],
    });
  }

  async getAllByStudent(studentId: number): Promise<Attendance[]> {
    return this.repository.find({
      where: { student: { id: studentId }},
      relations: ['student'],
    });
  }
}