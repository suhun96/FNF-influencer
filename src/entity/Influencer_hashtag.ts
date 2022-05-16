import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Influencer } from './Influencer';
import { Hashtag } from './Hashtag';

@Entity()
export class Influencer_Hashtag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'influencerID' })
    influencerID: number;

    @Column({ name: 'hashtagID' })
    hashtagID: number;

    @ManyToOne(() => Influencer, influencer => influencer.influencer_hashtags)
    @JoinColumn({ name: 'influencerID' })
    influencer: Influencer;

    @ManyToOne(() => Hashtag, hashtag => hashtag.influencer_hashtags, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'hashtagID' })
    hashtag: Hashtag;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
