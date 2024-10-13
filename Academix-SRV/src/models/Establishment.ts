import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { User } from './User'; 

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

    @Column({ type: 'timestamp', nullable: true })
    created_at?: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_update?: Date;
    
    // One establishment can have many teachers (users)
    @OneToMany(() => User, (user) => user.establishment, { eager: false })
    users?: User[];  // Array of users (teachers) who work at this establishment
}