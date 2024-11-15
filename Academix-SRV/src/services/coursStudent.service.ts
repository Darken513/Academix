import { BaseHttpService } from './basehttp.service';
import { CoursStudent } from '../models/CoursStudent';
import { DATA_SOURCE } from '../db/dataSource';
import { Cours } from '../models/Cours';
import { Student } from '../models/userRoles/Student';
import { Repository } from 'typeorm';
import { StudentPayment } from '../models/StudentPayment';

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
  coursStudentRepository = DATA_SOURCE.getRepository(CoursStudent);
  async getCoursesByStudent(studentId: number) {
    // Find all courses associated with the student
    const courses = await this.coursStudentRepository.find({
        where: { student: { id: studentId } },
        relations: ["cours"], // Load related course data
    });
  
    return courses;
  }

  async getStudentPaymentsByStudentAndCourse(studentId: number, coursId: number): Promise<StudentPayment[]> {
    // Step 1: Find the CoursStudent entry matching the student and course
    const coursStudent = await this.coursStudentRepository.findOne({
      where: {
        student: { id: studentId },
        cours: { id: coursId },
      },
      relations: ["studentPayments"], // Fetch related studentPayments
    });

    if (!coursStudent) {
      throw new Error(`No enrollment found for Student ID ${studentId} in Course ID ${coursId}`);
    }

    // Step 2: Return the payments associated with the found CoursStudent
    return coursStudent.studentPayments || [];
  }
  
  async getStudentPaymentsByStudent(studentId: number): Promise<StudentPayment[]> {
    // Step 1: Find all CoursStudent entries for the given student
    const coursStudents = await this.coursStudentRepository.find({
      where: { student: { id: studentId } },
      relations: ["studentPayments"], // Fetch related studentPayments
    });
  
    if (!coursStudents.length) {
      throw new Error(`No courses found for Student ID ${studentId}`);
    }
  
    // Step 2: Extract all studentPayments from the coursStudents
    const studentPayments = coursStudents.flatMap((cs) => cs.studentPayments || []);
  
    return studentPayments;
  }
}