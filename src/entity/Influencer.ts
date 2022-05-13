import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from "typeorm";
import { Message } from "./Message";
import { Influencer_Category } from "./Influencer_category";
import { Influencer_Hashtag } from "./Influencer_hashtag";

@Entity()
export class Influencer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  influencer_instagram_id: string;

  @Column()
  influencer_img: string;

  @Column({
    length: 20,
  })
  influencer_gender: string;

  @Column()
  influencer_follower: number;

  @Column()
  influencer_posting: number;

  @Column()
  influencer_average_like: number;

  @Column()
  influencer_average_comment: number;

  @OneToMany(() => Message, (message) => message.influencer)
  messages: Message;

  @OneToMany(
    () => Influencer_Category,
    (influencer_category) => influencer_category.influencer
  )
  influencer_categories: Influencer_Category[];

  @OneToMany(
    () => Influencer_Hashtag,
    (influencer_hashtag) => influencer_hashtag.influencer
  )
  influencer_hashtags: Influencer_Hashtag[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
