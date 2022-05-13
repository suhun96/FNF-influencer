import { Request, Response } from 'express';
import { Campaign } from '../entity/Campaign';
import { Influencer } from '../entity/Influencer';
import { Category } from '../entity/Category';
import config from '../config/config';
import { Influencer_Category } from '../entity/Influencer_category';
import { In } from 'typeorm';

const jwt = require('jsonwebtoken');

class FilterController {
    async userCampaignList(req: Request, res: Response) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const limit = req.query.limit as string;
        const limitNumber = parseInt(limit);
        const offset = req.query.offset as string;
        const offsetNumber = parseInt(offset);
        const userCampaignList = await Campaign.find({
            where: {
                userID: userId.id,
            },
            select: ['id', 'campaign_name'],
            skip: offsetNumber,
            take: limitNumber,
        });
        return res
            .status(200)
            .send({ message: 'success', result: userCampaignList });
    }

    async campaignStatusInfluencerList(req: Request, res: Response) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const campaign = req.query.campaignId as string;
        const campaignId = parseInt(campaign);
        const sortBy = req.query.sort_by as string;
        const sortOption = req.query.sort_option as string;
        const sortStatusBy = req.query.sort_status_by as string;
        const sortStatus = parseInt(sortStatusBy);
        const limit = req.query.limit as string;
        const limitNumber = parseInt(limit);
        const offset = req.query.offset as string;
        const offsetNumber = parseInt(offset);

        if (sortOption === 'down') {
            const influencerList = await Influencer.find({
                relations: {
                    messages: {
                        status: true,
                        campaign: true,
                    },
                    influencer_categories: {
                        category: true,
                    },
                    influencer_hashtags: {
                        hashtag: true,
                    },
                },
                where: {
                    messages: {
                        campaignID: campaignId,
                        statusID: sortStatus,
                        campaign: {
                            userID: userId.id,
                        },
                    },
                },
                select: {
                    messages: {
                        statusID: true,
                        status: {
                            status_name: true,
                        },
                    },
                },
                order: {
                    [sortBy]: 'DESC',
                },
                skip: offsetNumber,
                take: limitNumber,
            });
            return res
                .status(200)
                .json({ message: 'influencerList', result: influencerList });
        } else {
            const influencerList = await Influencer.find({
                relations: {
                    messages: { status: true },
                    influencer_categories: { category: true },
                    influencer_hashtags: { hashtag: true },
                },
                where: {
                    messages: {
                        campaignID: campaignId,
                        statusID: parseInt['sort_order'],
                    },
                },
                select: {
                    messages: {
                        statusID: true,
                        status: { status_name: true },
                    },
                },
                order: {
                    [sortBy]: 'ASC',
                },
                skip: offsetNumber,
                take: limitNumber,
            });
            return res
                .status(200)
                .send({ message: 'influencerList', result: influencerList });
        }
    }

    async campaignTotalStatusInfluencerList(req: Request, res: Response) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const campaign = req.query.campaignId as string;
        const campaignId = parseInt(campaign);
        const sortBy = req.query.sort_by as string;
        const sortOption = req.query.sort_option as string;
        const limit = req.query.limit as string;
        const limitNumber = parseInt(limit);
        const offset = req.query.offset as string;
        const offsetNumber = parseInt(offset);
        if (sortOption === 'down') {
            const influencerlist = await Influencer.find({
                relations: {
                    messages: {
                        status: true,
                        campaign: true,
                    },
                    influencer_categories: {
                        category: true,
                    },
                    influencer_hashtags: {
                        hashtag: true,
                    },
                },
                where: {
                    messages: {
                        campaignID: campaignId,
                        campaign: {
                            userID: userId.id,
                        },
                    },
                },
                select: {
                    messages: {
                        statusID: true,
                        status: {
                            status_name: true,
                        },
                    },
                },
                order: {
                    [sortBy]: 'DESC',
                },
                skip: offsetNumber,
                take: limitNumber,
            });
            return res
                .status(200)
                .json({ message: 'influenceList', result: influencerlist });
        } else {
            const influencerList = await Influencer.find({
                relations: {
                    messages: {
                        status: true,
                        campaign: true,
                    },
                    influencer_categories: {
                        category: true,
                    },
                    influencer_hashtags: {
                        hashtag: true,
                    },
                },
                where: {
                    messages: {
                        campaignID: campaignId,
                        statusID: parseInt['sort_order'],
                        campaign: {
                            userID: userId.id,
                        },
                    },
                },
                select: {
                    messages: {
                        statusID: true,
                    },
                },
                order: {
                    [sortBy]: 'ASC',
                },
                skip: offsetNumber,
                take: limitNumber,
            });
            return res
                .status(200)
                .send({ message: 'influencerList', result: influencerList });
        }
    }

    async categoryList(req: Request, res: Response) {
        const categoryList = await Category.find({
            select: ['id', 'category_name'],
        });
        res.status(200).json({
            message: 'categoryList',
            result: categoryList,
        });
    }

    async categoryInfluencerList(req: Request, res: Response) {
        const token = req.headers.authorization;
        const category = req.query.categoryId as string;
        const categoryId = parseInt(category);
        const sortBy = req.query.sort_by as string;
        const sortOption = req.query.sort_option as string;
        const limit = req.query.limit as string;
        const limitNumber = parseInt(limit);
        const offset = req.query.offset as string;
        const offsetNumber = parseInt(offset);
        if (token !== 'null') {
            const filter = await Influencer_Category.find({
                relations: {
                    influencer: true,
                },
                where: {
                    category: {
                        id: categoryId,
                    },
                },
                select: {
                    categoryID: true,
                    influencer: {
                        id: true,
                    },
                },
            });
            const influencerList = filter.map(item => item.influencer.id);
            if (sortOption === 'down') {
                const result =
                    influencerList &&
                    (await Influencer.findAndCount({
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
                return res
                    .status(200)
                    .json({ message: 'success', result: result });
            } else {
                const result =
                    influencerList &&
                    (await Influencer.findAndCount({
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
                    .json({ message: 'success', result: result });
            }
        } else if (
            categoryId === 1 &&
            sortBy === 'influencer_follower' &&
            sortOption === 'down' &&
            limit === '5' &&
            offset === '0'
        ) {
            const filter = await Influencer_Category.find({
                relations: {
                    influencer: true,
                },
                where: {
                    category: {
                        id: categoryId,
                    },
                },
                select: {
                    categoryID: true,
                    influencer: {
                        id: true,
                    },
                },
            });
            const influencerList = filter.map(item => item.influencer.id);
            const result =
                influencerList.length !== 0 &&
                (await Influencer.findAndCount({
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
            return res.status(200).send({ result: result });
        } else {
            return res.status(501).json({ message: 'Unauthorized' });
        }
    }
}

const filterController = new FilterController();
export default filterController;
