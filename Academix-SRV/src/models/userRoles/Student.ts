import { Column, ChildEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Establishment } from '../Establishment';
import { Attendance } from '../Attendance';
import { Parent } from './Parent';

@ChildEntity('Student')
export class Student extends User {
  @Column({ type: 'varchar', length: 255 })
  grade!: string;

  @ManyToOne(() => Establishment, (establishment) => establishment.student, { eager: true })
  @JoinColumn({ name: 'establishment_id' })
  establishment?: Establishment;

  @ManyToOne(() => Parent, (parent) => parent.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: Parent;

  @OneToMany(() => Attendance, (attendance) => attendance.student, { eager: false })
  attendances!: Attendance[];
}