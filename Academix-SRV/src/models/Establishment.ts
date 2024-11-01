import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
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

    @CreateDateColumn({ type: 'timestamp', nullable: false })
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @OneToMany(() => Student, (student) => student.establishment, { eager: false })
    students?: Student[];

    @OneToMany(() => Teacher, (teacher) => teacher.establishment, { eager: false })
    teachers?: Teacher[];
}