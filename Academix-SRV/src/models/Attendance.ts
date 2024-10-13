import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Establishment } from './Establishment';
import { User } from './User';
@Entity('attendance')
export class Attendance {

  @PrimaryGeneratedColumn()
  id!: number;  // primary key, auto-incremented

  @ManyToOne(() => Establishment, (establishment) => establishment.attendances)
  @JoinColumn({ name: 'establishment_id' })  // Foreign key to the establishment
  establishment!: Establishment;

  @ManyToOne(() => User, (user) => user.attendances)
  @JoinColumn({ name: 'user_id' })  // Foreign key to the user
  user!: User;

  @Column({ type: 'varchar', length: 255 })
  status!: string;

  @Column({ type: 'varchar', length: 255 })
  notes!: string;

  @Column({ type: 'boolean' })
  enabled!: boolean;

  @CreateDateColumn({ type: 'date' })
  created_at?: Date; 

  @CreateDateColumn({ type: 'date' })
  last_update?: Date;
}