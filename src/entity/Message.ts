import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Campaign } from './Campaign';
import { Status } from './Status';
import { Influencer } from './Influencer';

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 500,
        nullable: true,
    })
    message_content: string;

    @Column({ name: 'influencerID' })
    influencerID: number;

    @Column({ name: 'campaignID' })
    campaignID: number;

    @Column({ name: 'statusID' })
    statusID: number;

    @ManyToOne(() => Campaign, campaign => campaign.messages)
    @JoinColumn({ name: 'campaignID' })
    campaign: Campaign;

    @ManyToOne(() => Status, status => status.messages)
    @JoinColumn({ name: 'statusID' })
    status: Status;

    @ManyToOne(() => Influencer, influencer => influencer.messages)
    @JoinColumn({ name: 'influencerID' })
    influencer: Influencer;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
