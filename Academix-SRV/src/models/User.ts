import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Establishment } from './Establishment';
import { Attendance } from './Attendance';
import { Role } from './Role';
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  first_name!: string;

  @Column({ type: 'varchar', length: 255 })
  last_name!: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone_number?: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 50 })
  role!: Role;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  grade!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  note!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imgURL!: string;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_update?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @ManyToOne(() => Establishment, (establishment) => establishment.users, { eager: true })
  @JoinColumn({ name: 'establishment_id' }) 
  establishment?: Establishment;

  @ManyToOne(() => User, (user) => user.children)
  @JoinColumn({ name: 'parent_id' })
  parent?: User;

  @OneToMany(() => User, (user) => user.parent)
  children?: User[];

  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance[];
}