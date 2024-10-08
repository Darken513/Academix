import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('studentPayments')
export class StudentPayment {

  @PrimaryGeneratedColumn()
  id!: number;  // primary key, auto-incremented

  @Column()
  cours_student_id!: number;  // foreign key to course_student entity (assuming)

  @Column({ type: 'integer' })
  amount!: number;  // the amount paid

  @CreateDateColumn({ type: 'date' })
  paid_at!: Date;  // automatically set to the date when the payment was recorded
}
