import internal from 'stream';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Session } from './Session';

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'integer'})
    capacity!: number;

    @Column({ type: 'boolean', default: true, nullable: true })
    enabled?: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at?: Date;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @OneToMany(()=>Session, (session)=>session.room)
    sessions?: Session[];
}