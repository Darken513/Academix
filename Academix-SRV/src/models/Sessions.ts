import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import {Rooms} from './Rooms';
import {Attendance} from './Attendance'
import {Cours} from './Cours'
@Entity("sessions")
export class Sessions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "date" })
  session_date!: Date;

  @Column({ type: "timestamp" })
  start_time!: Date;

  @Column({ type: "timestamp" })
  end_time!: Date;

  @Column({ type: "boolean", default: true, nullable: true })
  enabled?: boolean;

  @Column({ type: "timestamp", nullable: true })
  created_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  last_update?: Date;

  @ManyToOne(() => Rooms, (room) => room.sessions)
  room?: Rooms;

  @OneToMany(() => Attendance, (attendance) => attendance.session, { eager: true })
  attendances?: Attendance[];

  @ManyToOne(() => Cours, (cours) => cours.sessions)
  cours?: Cours;
}
