import {Entity,PrimaryGeneratedColumn,Column,CreateDateColumn,Timestamp,OneToMany, UpdateDateColumn,} from "typeorm";
import { Cours } from "./Cours";
import { TeacherSubject } from "./TeacherSubject";

@Entity("subjects")
export class Subject {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  description!: string;

  @Column()
  enabled!: boolean;

  @CreateDateColumn({ type: "timestamp", nullable: false })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  last_update!: Date;

  @OneToMany(() => Cours, (cours) => cours.subject)
  courses!: Cours[];

  @OneToMany(() => TeacherSubject, (teacherSubject) => teacherSubject.subject)
  teachersSubjects!: TeacherSubject[];
}
