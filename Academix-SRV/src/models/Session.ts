import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Attendance } from './Attendance';
import { Room } from "./Room";
import { Cours } from "./Cours";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "date", nullable: false })
  session_date?: Date;

  @Column({ type: "time", nullable: false })
  start_time?: Date;

  @Column({ type: "time", nullable: false })
  end_time?: Date;

  @Column({ type: "boolean", default: true })
  enabled?: boolean;

  @CreateDateColumn({ type: 'timestamp', nullable: false})
  created_at?: Date;

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  last_update?: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.session)
  attendances!: Attendance[];  // One establishment can have many attendance records
  
  @ManyToOne(() => Room, (room) => room.sessions, { nullable: false, eager: true })
  @JoinColumn({name: 'room_id'})
  room?: Room;

  @ManyToOne(()=>Cours, (cours)=>cours.sessions, { nullable: false, eager: false })
  @JoinColumn({name: 'cours_id'})
  cours?: Cours;
}
