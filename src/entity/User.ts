import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Campaign } from './Campaign';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    user_email: string;

    @Column({ length: 200 })
    user_password: string;

    @Column({ length: 50 })
    user_brandname: string;

    @OneToMany(() => Campaign, campaign => campaign.user, {
        onDelete: 'CASCADE',
    })
    campaigns: Campaign[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
