import { Request, Response } from 'express';
import { Influencer } from '../entity/Influencer';
import { In } from 'typeorm';
import { Influencer_Hashtag } from '../entity/Influencer_hashtag';

class SearchController {
    async search(req: Request, res: Response) {
        const sortBy = req.query.sort_by as string;
        const sortOption = req.query.sort_option as string;
        const limit = req.query.limit as string;
        const limitNumber = parseInt(limit);
        const offset = req.query.offset as string;
        const offsetNumber = parseInt(offset);
        const key = req.query.key as string;
        const filter = await Influencer_Hashtag.find({
            relations: {
                influencer: true,
            },
            where: {
                hashtag: {
                    hashtag_name: key,
                },
            },
            select: {
                hashtagID: true,
                influencer: {
                    id: true,
                },
            },
        });
        console.log(filter);
        const influencerList = filter.map(item => item.influencer.id);
        console.log(influencerList);
        if (sortOption === 'down') {
            const result =
                influencerList &&
                (await Influencer.find({
                    relations: {
                        influencer_categories: {
                            category: true,
                        },
                        influencer_hashtags: {
                            hashtag: true,
                        },
                    },
                    where: {
                        id: In(influencerList),
                    },
                    order: {
                        [sortBy]: 'DESC',
                    },
                    skip: offsetNumber,
                    take: limitNumber,
                }));
            console.log(result);
            return res
                .status(200)
                .send({ message: 'success', influencerList: result });
        } else {
            const result =
                influencerList &&
                (await Influencer.find({
                    relations: {
                        influencer_categories: {
                            category: true,
                        },
                        influencer_hashtags: {
                            hashtag: true,
                        },
                    },
                    where: {
                        id: In(influencerList),
                    },
                    order: {
                        [sortBy]: 'ASC',
                    },
                    skip: offsetNumber,
                    take: limitNumber,
                }));
            return res
                .status(200)
                .send({ message: 'success', influencerList: result });
        }
    }
}

const searchController = new SearchController();
export default searchController;
