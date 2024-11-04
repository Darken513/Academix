import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './userRoles/Teacher';
import { Cours } from './Cours';

@Entity('teacherPayments')
export class TeacherPayment {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'integer' })
  amount?: number;

  @Column({ type: 'boolean', nullable: true })
  fromWallet!: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  paid_at?: Date;
  
  @ManyToOne(()=>Cours, (cours) => cours.teacherPayments, { nullable: false })
  @JoinColumn({name: 'cours_id'})
  cours?: Cours;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherPayments, { nullable: false })
  @JoinColumn({ name: 'teacher_id' })
  teacher?: Teacher;
}
