import { ChildEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Establishment } from '../Establishment';
import { Cours } from '../Cours';
import { TeacherPayment } from '../TeacherPayment';
import { TeacherSubject } from '../TeacherSubject';

@ChildEntity('teachers')
export class Teacher extends User {
    @ManyToOne(() => Establishment, (establishment) => establishment.teachers, { nullable: false })
    @JoinColumn({ name: 'establishment_id' })
    establishment?: Establishment;

    @OneToMany(() => Cours, (cours) => cours.teacher)
    courses!: Cours[];

    @OneToMany(() => TeacherPayment, (teacherpayment) => teacherpayment.teacher)
    teacherPayments?: TeacherPayment[];

    @OneToMany(() => TeacherSubject, (teachersSubjects) => teachersSubjects.teacher)
    teachersSubjects?: TeacherSubject[];
}