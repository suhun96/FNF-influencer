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
import { Category } from './Category';

@Entity()
export class Influencer_Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'influencerID' })
    influencerID: number;

    @Column({ name: 'categoryID' })
    categoryID: number;

    @ManyToOne(() => Influencer, influencer => influencer.influencer_categories)
    @JoinColumn({ name: 'influencerID' })
    influencer: Influencer;

    @ManyToOne(() => Category, category => category.influencer_categories, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'categoryID' })
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
