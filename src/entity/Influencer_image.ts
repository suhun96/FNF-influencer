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
import { Image } from './Image';

@Entity()
export class Influencer_Image extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'influencerID' })
    influencerID: number;

    @Column({ name: 'imageID' })
    imageID: number;

    @ManyToOne(() => Influencer, influencer => influencer.influencer_images)
    @JoinColumn({ name: 'influencerID' })
    influencer: Influencer;

    @ManyToOne(() => Image, image => image.influencer_images, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'imageID' })
    image: Image;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
