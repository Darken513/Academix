import { ChildEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Establishment } from '../Establishment';
import { Cours } from '../Cours';
import { TeacherPayment } from '../TeacherPayment';
import { TeacherSubject } from '../TeacherSubject';
import { CenterReferedUser } from '../CenterReferedUser';

@ChildEntity('teachers')
export class Teacher extends User {
    @ManyToOne(() => Establishment, (establishment) => establishment.teachers, { eager: true })
    @JoinColumn({ name: 'establishment_id' })
    establishment?: Establishment;

    @OneToMany(() => Cours, (cours) => cours.teacher)
    courses!: Cours[];

    @OneToMany(()=>TeacherPayment, (teacherpayment)=>teacherpayment.teacher)
    teacherpayments?: TeacherPayment[];

    @OneToMany(()=>TeacherSubject, (teachersSubjects)=>teachersSubjects.teacher)
    teachersSubjects?: TeacherSubject[];

    @OneToMany(()=>CenterReferedUser, (centerRefereduser)=>centerRefereduser.teacher)
    centerReferedUsers?: CenterReferedUser[];
}