import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Influencer_Category } from './Influencer_category';

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
    })
    category_name: string;

    @OneToMany(
        () => Influencer_Category,
        influencer_category => influencer_category.category
    )
    influencer_categories: Influencer_Category[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
