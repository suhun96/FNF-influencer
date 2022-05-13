import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
} from 'typeorm';
import { Influencer_Hashtag } from './Influencer_hashtag';

@Entity()
export class Hashtag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    // @Index({ fulltext: true })
    @Column({
        length: 100,
    })
    hashtag_name: string;

    @OneToMany(
        () => Influencer_Hashtag,
        influencer_hashtag => influencer_hashtag.hashtag
    )
    influencer_hashtags: Influencer_Hashtag[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
