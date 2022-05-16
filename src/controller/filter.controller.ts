import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class FilterController {
    async userCampaignList(req: IGetUserAuthInfoRequest, res: Response) {
        const userCampaignList = req.campaign;
        return res
            .status(200)
            .send({ message: 'success', result: userCampaignList });
    }

    async campaignStatusInfluencerList(
        req: IGetUserAuthInfoRequest,
        res: Response
    ) {
        const sortOption = req.sortOption;
        const influencerListDown = req.influencerListDown;
        const influencerListUp = req.influencerListUp;
        if (sortOption === 'down') {
            influencerListDown;
            return res.status(200).send({
                message: 'influencerList',
                result: influencerListDown,
            });
        } else {
            influencerListUp;
            return res
                .status(200)
                .send({ message: 'influencerList', result: influencerListUp });
        }
    }

    async campaignTotalStatusInfluencerList(
        req: IGetUserAuthInfoRequest,
        res: Response
    ) {
        const sortOption = req.sortOption;
        const influencerListDown = req.influencerListDown;
        const influencerListUp = req.influencerListUp;
        if (sortOption === 'down') {
            influencerListDown;
            return res
                .status(200)
                .json({ message: 'influenceList', result: influencerListDown });
        } else {
            influencerListUp;
            return res
                .status(200)
                .send({ message: 'influencerList', result: influencerListUp });
        }
    }

    async categoryList(req: IGetUserAuthInfoRequest, res: Response) {
        const categoryList = req.categoryList;
        res.status(200).json({
            message: 'categoryList',
            result: categoryList,
        });
    }

    async categoryInfluencerList(req: IGetUserAuthInfoRequest, res: Response) {
        const token = req.headers.authorization;
        const influencerList = req.influencerList;
        const sortOption = req.sortOption;
        const influencerListDown = req.influencerListDown;
        const influencerListUp = req.influencerListUp;
        const categoryId = req.categoryId;
        const sortBy = req.sortBy;
        const limitNumber = req.limitNumber;
        const offsetNumber = req.offsetNumber;
        if (token !== 'null') {
            influencerList;
            if (sortOption === 'down') {
                influencerListDown;
                return res
                    .status(200)
                    .json({ message: 'success', result: influencerListDown });
            } else {
                influencerListUp;
                return res
                    .status(200)
                    .json({ message: 'success', result: influencerListUp });
            }
        } else if (
            categoryId === 1 &&
            sortBy === 'influencer_follower' &&
            sortOption === 'down' &&
            limitNumber === 5 &&
            offsetNumber === 0
        ) {
            influencerList;
            influencerListDown;
            return res.status(200).send({ result: influencerListDown });
        } else {
            return res.status(501).json({ message: 'Unauthorized' });
        }
    }
}

const filterController = new FilterController();
export default filterController;
