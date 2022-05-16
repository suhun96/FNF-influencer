import { NextFunction, Response } from 'express';
import { In } from 'typeorm';
import { IGetUserAuthInfoRequest } from '../definition';
import { Influencer } from '../entity/Influencer';
import { Influencer_Hashtag } from '../entity/Influencer_hashtag';

class SearchOrmController {
    async searchOrm(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const key = req.query.key as string;
        const sortBy = req.query.sort_by as string;
        const limit = req.query.limit as string;
        const limitNumber = parseInt(limit);
        const offset = req.query.offset as string;
        const offsetNumber = parseInt(offset);
        const sortOption = req.query.sort_option as string;
        const influencerList = await Influencer_Hashtag.find({
            relations: { influencer: true },
            where: {
                hashtag: { hashtag_name: key },
            },
            select: {
                hashtagID: true,
                influencer: { id: true },
            },
        });
        const influencerIdList = influencerList.map(item => item.influencer.id);
        const influencerListDown =
            influencerList &&
            (await Influencer.findAndCount({
                relations: {
                    influencer_categories: { category: true },
                    influencer_hashtags: { hashtag: true },
                },
                where: { id: In(influencerIdList) },
                order: { [sortBy]: 'DESC' },
                skip: offsetNumber,
                take: limitNumber,
            }));
        const influencerListUp =
            influencerList &&
            (await Influencer.findAndCount({
                relations: {
                    influencer_categories: { category: true },
                    influencer_hashtags: { hashtag: true },
                },
                where: { id: In(influencerIdList) },
                order: { [sortBy]: 'ASC' },
                skip: offsetNumber,
                take: limitNumber,
            }));
        req.influencerListUp = influencerListUp;
        req.influencerListDown = influencerListDown;
        req.influencerList = influencerList;
        req.sortOption = sortOption;
        return next();
    }
}

const searchOrmController = new SearchOrmController();
export default searchOrmController;
