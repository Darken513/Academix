import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, ManyToOne } from 'typeorm';
import {Sessions} from './Sessions'

@Entity('attendance')
export class Attendance {

  @PrimaryGeneratedColumn()
  id!: number;  // primary key, auto-incremented

  @Column()
  student_id!: number;  // foreign key to student entity 

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

  @ManyToOne(() => Sessions, (session) => session.attendances)
  session?: Sessions;
}