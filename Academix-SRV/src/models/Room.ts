import internal from 'stream';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Session } from './Session';

@Entity('rooms')
export class Rooms {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @Column({ type: 'integer'})
    capacity!: number;

    @Column({ type: 'boolean', default: true, nullable: true })
    enabled?: boolean;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @CreateDateColumn({ type: 'timestamp', nullable: true })
    last_update?: Date;

    @OneToMany(()=>Session, (session)=>session.rooms)
    sessions?: Session[];
}