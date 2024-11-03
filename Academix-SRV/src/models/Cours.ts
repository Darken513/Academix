import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Subject } from './Subject';
import { Teacher } from './userRoles/Teacher';
import { Session } from './Session';
import { CoursStudent } from './CoursStudent';
import { PaymentMode } from './PaymentMode';

@Entity('courses')
export class Cours {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Subject, (subject) => subject.courses, { nullable: false })
  @JoinColumn({ name: 'subject_id' })
  subject!: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @OneToOne(() => PaymentMode, { nullable: false })
  @JoinColumn({ name: 'paymentMode_id' })
  paymentMode!: PaymentMode;

  @Column({ type: 'boolean' })
  enabled!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: 'date', nullable: true })
  last_update!: Date;

  @OneToMany(() => Session, (session) => session.cours)
  sessions?: Session[];

  @OneToMany(() => CoursStudent, (coursStudent) => coursStudent.cours)
  coursStudents?: CoursStudent[];
}