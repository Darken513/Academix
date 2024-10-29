import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';
import { Cours } from './Cours';
import { Student } from './userRoles/Student';

@Entity('centerReferedUsers')
export class CenterReferedUser {

  @PrimaryGeneratedColumn()
  id!: number;  

  @ManyToOne(() => Cours, (cours) => cours.centerReferedUsers, { nullable: false })
  @JoinColumn({ name: 'cours_id' })
  cours!: Cours;

  @ManyToOne(() => Teacher, (teacher) => teacher.centerReferedUsers, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @ManyToOne(() => Student, (student) => student.centerReferedUsers, { nullable: false })
  @JoinColumn({ name: 'student_id' })
  student!: Student;

  @Column({ type: 'boolean', default: true, nullable: true })
  enabled?: boolean;
}
