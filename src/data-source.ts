import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Campaign } from './entity/Campaign';
import { Category } from './entity/Category';
import { Hashtag } from './entity/Hashtag';
import { Influencer } from './entity/Influencer';
import { Influencer_Category } from './entity/Influencer_category';
import { Influencer_Hashtag } from './entity/Influencer_hashtag';
import { Message } from './entity/Message';
import { Status } from './entity/Status';
import { User } from './entity/User';

const AppDataSource = new DataSource({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: '0000',
    database: 'influencer',
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
        Category,
        Hashtag,
    ],
    migrations: ['src/migration/*{.ts,.js}'],
});

export default AppDataSource;
