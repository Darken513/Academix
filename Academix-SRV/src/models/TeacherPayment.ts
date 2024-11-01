import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';

@Entity('teacherPayments')
export class TeacherPayment {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cours_id!: number;

  @Column({ type: 'integer' })
  amount?: number;

  @Column({ type: 'boolean' })
  fromWallet!: number;

  @CreateDateColumn({ type: 'timestamp', nullable: false })
  paid_at?: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherpayments, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher?: Teacher;
}
