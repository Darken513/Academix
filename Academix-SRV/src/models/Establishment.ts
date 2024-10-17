import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from './userRoles/Student';
import { Teacher } from './userRoles/Teacher';

@Entity('establishments')
export class Establishment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'boolean', default: true, nullable: true })
    enabled?: boolean;

    @Column({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @OneToMany(() => Student, (student) => student.establishment, { eager: false })
    student?: Student[];

    @OneToMany(() => Teacher, (teacher) => teacher.establishment, { eager: false })
    teacher?: Teacher[];
}