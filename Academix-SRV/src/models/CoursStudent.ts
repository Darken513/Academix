import internal from 'stream';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn, UpdateDateColumn } from 'typeorm';
import { Cours } from './Cours';
import { Student } from './userRoles/Student';
import { StudentPayment } from './StudentPayment';

@Entity('courses_students')
export class CoursStudent {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'integer'})
    unpaid_sessions_count!: number;

    @Column({ type: 'boolean', default: false })
    refered?: boolean;

    @Column({ type: 'boolean', default: true, nullable: true })
    enabled?: boolean;

    @CreateDateColumn({ type: 'timestamp', nullable: false})
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @ManyToOne(()=>Cours, (cours)=>cours.coursStudents, { nullable: false , eager: true})
    @JoinColumn({name: 'cours_id'})
    cours?: Cours;

    @ManyToOne(()=>Student, (student)=>student.coursStudent, { nullable: false , eager: true})
    @JoinColumn({name: 'student_id'})
    student?: Student;

    @OneToMany(()=>StudentPayment, (studentPayment)=>studentPayment.coursStudent, { eager: true})
    studentPayments?: StudentPayment[];
}