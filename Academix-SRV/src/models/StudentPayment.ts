import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CoursStudent } from './CoursStudent';

@Entity('studentPayments')
export class StudentPayment {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'boolean' })
  fromWallet!: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  paid_at!: Date;  // automatically set to the date when the payment was recorded

  @ManyToOne(()=>CoursStudent, (coursStudent)=>coursStudent.studentPayments, { nullable: false })
  @JoinColumn({name: 'cours_student_id'})
  coursStudent?: CoursStudent;
}
