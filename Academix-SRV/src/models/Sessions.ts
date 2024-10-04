import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("sessions")
export class Sessions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  cours_id!: string;

  @Column({ type: "varchar", length: 255 })
  room_id!: string;

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
}
