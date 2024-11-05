import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Session } from './Session';
import { Student } from './userRoles/Student';
@Entity('attendances')
export class Attendance {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Session, (session) => session.attendances, { nullable: false, eager: true})
  @JoinColumn({ name: 'session_id' })
  session!: Session;

  @ManyToOne(() => Student, (student) => student.attendances, { nullable: false, eager: true })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column({ type: 'varchar', length: 255 })
  status!: string;

  @Column({ type: 'varchar', length: 255 })
  notes!: string;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false})
  created_at?: Date;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  last_update?: Date;
}