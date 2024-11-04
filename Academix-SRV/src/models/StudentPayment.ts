import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { CoursStudent } from './CoursStudent';

@Entity('studentPayments')
export class StudentPayment {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  amount!: number;
  
  @Column({ type: 'boolean' })
  fromWallet!: boolean;
  
  @CreateDateColumn({ type: 'date' })
  paid_at!: Date;
  
  @ManyToOne(() => CoursStudent, (coursStudent) => coursStudent.studentPayments, { nullable: false })
  @JoinColumn({ name: 'cours_student_id' })
  coursStudent?: CoursStudent;
}
