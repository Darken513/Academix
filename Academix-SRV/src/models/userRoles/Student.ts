import { Column, ChildEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Establishment } from '../Establishment';
import { Attendance } from '../Attendance';
import { Parent } from './Parent';
import { CoursStudent } from '../CoursStudent';

@ChildEntity('students')
export class Student extends User {
  @Column({ type: 'varchar', length: 255 })
  yearLevel!: string;

  @ManyToOne(() => Establishment, (establishment) => establishment.students, { eager: false })
  @JoinColumn({ name: 'establishment_id' })
  establishment?: Establishment;

  @ManyToOne(() => Parent, (parent) => parent.children, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parent?: Parent;

  @OneToMany(() => Attendance, (attendance) => attendance.student, { eager: false })
  attendances!: Attendance[];

  @OneToMany(() => CoursStudent, (coursStudent) => coursStudent.student)
  coursStudent?: CoursStudent[];
}