import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Session } from './Session';
import { Student } from './userRoles/Student';
@Entity('attendances')
export class Attendance {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Session, (session) => session.attendances, { nullable: false })
  @JoinColumn({ name: 'session_id' })
  sessions!: Session;

  @ManyToOne(() => Student, (student) => student.attendances, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column({ type: 'varchar', length: 255 })
  status!: string;

  @Column({ type: 'varchar', length: 255 })
  notes!: string;

  @Column({ type: 'boolean' })
  enabled!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @CreateDateColumn({ type: 'date' })
  last_update?: Date;
}