import { PrimaryGeneratedColumn, Column, Entity, TableInheritance, OneToMany } from 'typeorm';
import { WalletPayments } from '../walletPayment';

@Entity('users')
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  first_name!: string;

  @Column({ type: 'varchar', length: 255 })
  last_name!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password!: string;

  //this was added to separate two users that has same name same family name and 0 other infos
  @Column({ type: 'varchar', length: 255, nullable: true })
  note!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgURL!: string;

  @Column({ type: 'float' })
  walletBalance!: number;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_update?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @OneToMany(() => WalletPayments, (walletPayment) => walletPayment.user)
  walletPaymentss?: WalletPayments[];
}