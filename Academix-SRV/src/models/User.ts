import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Establishment } from './Establishment';
import { Attendance } from './Attendance';
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
  role!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @Column({ type: 'varchar', length: 255 })
  grade!: string;

  @Column({ type: 'varchar', length: 255 })
  note!: string;

  @Column({ type: 'varchar', length: 255 })
  imgURL!: string;

  @Column({ type: 'boolean', default: true })
  enabled?: boolean;

  @Column({ type: 'timestamp', nullable: true })
  last_update?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  // Many users (teachers) can work in one establishment
  @ManyToOne(() => Establishment, (establishment) => establishment.teachers)
  @JoinColumn({ name: 'establishment_id' })  // This will store the establishment reference in the "users" table
  establishment?: Establishment;
  
  // Many users can have one parent (many-to-one relationship)
  @ManyToOne(() => User, (user) => user.children)
  @JoinColumn({ name: 'parent_id' })  // references the parent_id field
  parent?: User;
  
  // One user can have many children (one-to-many relationship)
  @OneToMany(() => User, (user) => user.parent)
  children?: User[];
  
  @OneToMany(() => Attendance, (attendance) => attendance.user)
  attendances!: Attendance[];  // One user can have many attendance records
}