import internal from 'stream';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, UpdateDateColumn } from 'typeorm';
import { Session } from './Session';

@Entity('rooms')
export class Room {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'integer'})
    capacity!: number;

    @Column({ type: 'boolean', default: true })
    enabled?: boolean;

    @CreateDateColumn({ type: 'timestamp', nullable: false})
    created_at?: Date;

    @UpdateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @OneToMany(()=>Session, (session)=>session.room)
    sessions?: Session[];
}