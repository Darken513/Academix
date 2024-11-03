import internal from 'stream';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
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

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @ManyToOne(()=>Cours, (cours)=>cours.coursStudents, { nullable: false })
    @JoinColumn({name: 'cours_id'})
    cours?: Cours;

    @ManyToOne(()=>Student, (student)=>student.coursStudent, { nullable: false })
    @JoinColumn({name: 'student_id'})
    student?: Student;

    @OneToMany(()=>StudentPayment, (studentPayment)=>studentPayment.coursStudent)
    studentPayments?: StudentPayment[];
}