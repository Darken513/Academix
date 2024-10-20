import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Subject } from './Subject';
import { Teacher } from './userRoles/Teacher';
import { Session } from './Session';
import { CoursStudent } from './CoursStudent';
import { CenterReferedUser } from './centerReferedUser';

@Entity('courses')
export class Cours {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Subject, (subject) => subject.courses)
  @JoinColumn({ name: 'subject_id' })
  subject!: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses)
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @Column({ type: 'boolean' })
  managed_by_center!: boolean;

  @Column({ type: 'float' })
  student_price_per_session!: number;

  @Column({ type: 'varchar', length: 255 })
  paymentType!: string;

  @Column({ type: 'float' })
  teacher_price_per_session!: number;

  @Column({ type: 'float' })
  teacher_price_per_student!: number;

  @Column({ type: 'float' })
  teacher_price_flat_rate!: number;

  @Column({ type: 'integer' })
  unpaid_total!: number;

  @Column({ type: 'boolean' })
  enabled!: boolean;

  @CreateDateColumn({ type: 'date' })
  created_at!: Date;

  @Column({ type: 'date', nullable: true })
  last_update!: Date;

  @OneToMany(()=>Session, (session)=>session.cours)
  sessions?: Session[];

  @OneToMany(()=>CoursStudent, (coursStudent)=>coursStudent.cours)
  coursStudent?: CoursStudent[];

  @OneToMany(()=>CenterReferedUser, (centerRefereduser)=>centerRefereduser.cours)
  centerReferedUsers?: CenterReferedUser[];
}
