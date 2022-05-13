import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Message } from './Message';
@Entity()
export class Campaign extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    campaign_name: string;

    @Column({ name: 'userID' })
    userID: number;

    @ManyToOne(() => User, user => user.campaigns)
    @JoinColumn({ name: 'userID' })
    user: User;

    @OneToMany(() => Message, message => message.campaign, {
        onDelete: 'CASCADE',
    })
    messages: Message[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
