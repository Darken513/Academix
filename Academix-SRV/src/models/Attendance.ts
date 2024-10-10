import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('attendance')
export class Attendance {

  @PrimaryGeneratedColumn()
  id!: number;  // primary key, auto-incremented

  @Column()
  student_id!: number;  // foreign key to student entity 

  @Column()
  session_id!: number;  // foreign key to session entity

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