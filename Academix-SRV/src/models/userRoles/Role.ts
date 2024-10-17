import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './Student';
import { Teacher } from './Teacher';
import { Admin } from './Admin';
import { Parent } from './Parent';

export enum UserRole {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    STUDENT = 'student',
    PARENT = 'parent'
}
/* 
@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
    email?: string;

    @Column({ type: 'varchar', length: 50 })
    role!: Role;

    @OneToMany(() => Student, (student) => student.role)
    students?: Student[];
    
    @OneToMany(() => Teacher, (teacher) => teacher.role)
    teachers?: Teacher[];
    
    @OneToMany(() => Admin, (admin) => admin.role)
    admins?: Admin[];
    
    @OneToMany(() => Parent, (parent) => parent.role)
    parents?: Parent[];
} */