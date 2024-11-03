import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';
import { Subject } from './Subject';

@Entity('teachers_subjects')
export class TeacherSubject {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'boolean', default: true, nullable: true })
  enabled?: boolean;

  @ManyToOne(() => Subject, (subjects) => subjects.teachersSubjects, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  subject?: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.teachersSubjects, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher?: Teacher;
}
