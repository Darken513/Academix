import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';
import { Cours } from './Cours';
import { Student } from './userRoles/Student';

@Entity('CenterReferedUsers')
export class CenterReferedUser {

  @PrimaryGeneratedColumn()
  id!: number;  

  @ManyToOne(() => Cours, (cours) => cours.centerReferedUsers)
  @JoinColumn({name: 'cours_id'})
  cours?: Cours;

  @ManyToOne(() => Teacher, (teacher) => teacher.centerReferedUsers)
  @JoinColumn({name: 'teacher_id'})
  teacher?: Teacher;

  @ManyToOne(() => Student, (student) => student.centerReferedUsers)
  @JoinColumn({name: 'student_id'})
  student?: Student;

  @Column({ type: 'boolean', default: true, nullable: true })
  enabled?: boolean;
}
