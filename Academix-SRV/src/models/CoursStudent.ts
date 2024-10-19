import internal from 'stream';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Cours } from './Cours';
import { Student } from './userRoles/Student';
import { StudentPayment } from './StudentPayment';

@Entity('coursStudent')
export class CoursStudent {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer'})
    unpaid_sessions_count!: number;

    @Column({ type: 'boolean', default: true, nullable: true })
    enabled?: boolean;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @ManyToOne(()=>Cours, (cours)=>cours.coursStudent)
    @JoinColumn({name: 'cours_id'})
    cours?: Cours;

    @ManyToOne(()=>Student, (student)=>student.coursStudent)
    @JoinColumn({name: 'student_id'})
    student?: Student;

    @OneToMany(()=>StudentPayment, (studentPayment)=>studentPayment.coursStudent)
    studentPayment?: StudentPayment[];
}