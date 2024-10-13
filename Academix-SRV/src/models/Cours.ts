import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import {Sessions} from './Sessions'
@Entity('courses') // maps to the 'cours' table in the database
export class Cours {
  
  @PrimaryGeneratedColumn()
  id!: number; // primary key
  
  @Column()
  subject_id!: number; // foreign key to the subject entity
  
  @Column()
  teacher_id!: number; // foreign key to the teacher entity
  
  @Column({ type: 'boolean' })
  managed_by_center!: boolean; // boolean flag for whether it's managed by the center
  
  @Column({ type: 'float' })
  student_price_per_session!: number; // price per session for students
  
  @Column({ type: 'varchar', length: 255 })
  paymentType!: string; // varchar to store the type of payment
  
  @Column({ type: 'float' })
  teacher_price_per_session!: number; // price per session for the teacher
  
  @Column({ type: 'float' })
  teacher_price_per_student!: number; // price per student per session for the teacher
  
  @Column({ type: 'float' })
  teacher_price_flat_rate!: number; // flat rate for the teacher
  
  @Column({ type: 'integer' })
  unpaid_total!: number; // total unpaid amount
  
  @Column({ type: 'boolean' })
  enabled!: boolean; // flag for whether the course is enabled or not
  
  @CreateDateColumn({ type: 'date' })
  created_at!: Date; // date when the course was created (auto-generated)
  
  @Column({ type: 'date', nullable: true })
  last_update!: Date; // manually updated field, nullable if no updates have been made

  @OneToMany (() => Sessions, (session) => session.cours)
  sessions?: Sessions[];
}
