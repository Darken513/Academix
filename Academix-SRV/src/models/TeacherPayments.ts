import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('teacherPayments')
export class TeacherPayments {

  @PrimaryGeneratedColumn()
  id!: number;  // primary key, auto-incremented

  @Column()
  cours_id!: number;  // foreign key to course entity 

  @Column()
  teacher_id!: number;  // foreign key to users entity 

  @Column({ type: 'integer' })
  amount?: number;  // the amount paid

  @CreateDateColumn({ type: 'timestamp', nullable: true })
  paid_at?: Date;  // automatically set to the date when the payment was recorded
}
