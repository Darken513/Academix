import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Attendance } from './Attendance'; 
import { Rooms } from "./Room";
import { Cours } from "./Cours";

@Entity("sessions")
export class Session {
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at?: Date;

  @Column({ type: "timestamp", nullable: true })
  last_update?: Date;

  @OneToMany(() => Attendance, (attendance) => attendance.sessions)
  attendances!: Attendance[];  // One establishment can have many attendance records
  
  @ManyToOne(() => Rooms, (rooms) => rooms.sessions, { nullable: false })
  @JoinColumn({name: 'room_id'})
  rooms?: Rooms;

  @ManyToOne(()=>Cours, (cours)=>cours.sessions, { nullable: false })
  @JoinColumn({name: 'cours_id'})
  cours?: Cours;
}
