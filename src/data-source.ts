import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Campaign } from './entity/Campaign';
import { Category } from './entity/Category';
import { Hashtag } from './entity/Hashtag';
import { Image } from './entity/Image';
import { Influencer } from './entity/Influencer';
import { Influencer_Category } from './entity/Influencer_category';
import { Influencer_Hashtag } from './entity/Influencer_hashtag';
import { Influencer_Image } from './entity/Influencer_image';
import { Message } from './entity/Message';
import { Status } from './entity/Status';
import { User } from './entity/User';
require('dotenv').config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: false,
    logging: false,
    entities: [
        User,
        Campaign,
        Message,
        Status,
        Influencer,
        Influencer_Category,
        Influencer_Hashtag,
        Influencer_Image,
        Category,
        Hashtag,
        Image,
    ],
    migrations: ['src/migration/*{.ts,.js}'],
});

export default AppDataSource;
