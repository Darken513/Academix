import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';

@Entity('teacherPayments')
export class TeacherPayment {

  @PrimaryGeneratedColumn()
  id!: number;  // primary key, auto-incremented

  @Column()
  cours_id!: number;  // foreign key to course entity 

  @Column({ type: 'integer' })
  amount?: number;  // the amount paid

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  paid_at?: Date;  // automatically set to the date when the payment was recorded

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherpayments)
  @JoinColumn({name: 'teacher_id'})
  teacher?: Teacher;
}
