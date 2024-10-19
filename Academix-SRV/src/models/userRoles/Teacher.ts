import { ChildEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Establishment } from '../Establishment';
import { Cours } from '../Cours';
import { TeacherPayments } from '../TeacherPayments';
import { TeachersSubjects } from '../TeachersSubjects';

@ChildEntity('Teacher')
export class Teacher extends User {
    @ManyToOne(() => Establishment, (establishment) => establishment.teacher, { eager: true })
    @JoinColumn({ name: 'establishment_id' })
    establishment?: Establishment;

    @OneToMany(() => Cours, (cours) => cours.teacher)
    courses!: Cours[];

    @OneToMany(()=>TeacherPayments, (teacherpayments)=>teacherpayments.teacher)
    teacherpayments?: TeacherPayments[];

    @OneToMany(()=>TeachersSubjects, (teachersSubjects)=>teachersSubjects.teacher)
    teachersSubjects?: TeachersSubjects[];
}