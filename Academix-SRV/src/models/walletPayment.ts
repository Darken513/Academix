import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './userRoles/User';

@Entity('walletPayments')
export class WalletPayments {

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.walletPaymentss, { nullable: false })
  @JoinColumn({ name: 'cours_student_id' })
  user?: User;

  @Column({ type: 'integer' })
  amount!: number;

  @Column({ type: 'boolean', nullable: true })
  fromWallet!: boolean;

  @CreateDateColumn({ type: 'date' })
  paid_at!: Date;
}
