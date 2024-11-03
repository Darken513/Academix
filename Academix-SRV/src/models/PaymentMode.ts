import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Cours } from './Cours';

@Entity('paymentModes')
export class PaymentMode {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'boolean' })
  managed_by_center!: boolean;

  @Column({ type: 'varchar', length: 255 })
  studentPaymentType!: string;

  @Column({ type: 'float' })
  student_price_per_session!: number;

  @Column({ type: 'float' })
  student_price_flat_rate!: number;

  @Column({ type: 'varchar', length: 255 })
  teacherPaymentType!: string;

  @Column({ type: 'float' })
  teacher_price_per_session!: number;

  @Column({ type: 'float' })
  teacher_price_per_student!: number;

  @Column({ type: 'float' })
  teacher_price_flat_rate!: number;

  @Column({ type: 'integer' })
  unpaid_total!: number;

  @OneToOne(() => Cours, (cours) => cours.paymentMode)
  cours?: Cours;
}