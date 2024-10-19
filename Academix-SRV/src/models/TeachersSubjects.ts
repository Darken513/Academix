import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';
import { Subject } from './Subject';

@Entity('teachersSubjects')
export class TeachersSubjects {

  @PrimaryGeneratedColumn()
  id!: number;  

  @Column({ type: 'boolean', default: true, nullable: true })
  enabled?: boolean;

  @ManyToOne(() => Subject, (subjects) => subjects.teachersSubjects)
  @JoinColumn({name: 'subject_id'})
  subjects?: Subject;

  @ManyToOne(() => Teacher, (teacher) => teacher.teachersSubjects)
  @JoinColumn({name: 'teacher_id'})
  teacher?: Teacher;
}
