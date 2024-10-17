import { ChildEntity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Establishment } from '../Establishment';
import { Cours } from '../Cours';

@ChildEntity('Teacher')
export class Teacher extends User {
    @ManyToOne(() => Establishment, (establishment) => establishment.teacher, { eager: true })
    @JoinColumn({ name: 'establishment_id' })
    establishment?: Establishment;

    @OneToMany(() => Cours, (cours) => cours.teacher)
    courses!: Cours[];
}