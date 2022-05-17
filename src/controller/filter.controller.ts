import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class FilterController {
    async userCampaignList(req: IGetUserAuthInfoRequest, res: Response) {
        const { campaignList: userCampaignList } = req;
        return res
            .status(200)
            .send({ message: 'Success', result: userCampaignList });
    }

    async campaignStatusInfluencerList(
        req: IGetUserAuthInfoRequest,
        res: Response
    ) {
        const { sortOption, influencerListDown, influencerListUp } = req;
        if (sortOption === 'down') {
            return res.status(200).send({
                message: 'influencerList',
                result: influencerListDown,
            });
        } else {
            return res
                .status(200)
                .send({ message: 'InfluencerList', result: influencerListUp });
        }
    }

    async campaignTotalStatusInfluencerList(
        req: IGetUserAuthInfoRequest,
        res: Response
    ) {
        const { sortOption, influencerListDown, influencerListUp } = req;
        if (sortOption === 'down') {
            return res
                .status(200)
                .send({ message: 'Success', result: influencerListDown });
        } else {
            return res
                .status(200)
                .send({ message: 'Success', result: influencerListUp });
        }
    }

    async categoryList(req: IGetUserAuthInfoRequest, res: Response) {
        const { categoryList } = req;
        res.status(200).send({
            message: 'Success',
            result: categoryList,
        });
    }

    async categoryInfluencerList(req: IGetUserAuthInfoRequest, res: Response) {
        const { sortOption, influencerListDown, influencerListUp, count } = req;
        if (sortOption === 'down') {
            return res.status(200).send({
                message: 'Success',
                result: influencerListDown,
                count,
            });
        } else {
            return res
                .status(200)
                .send({ message: 'Success', result: influencerListUp, count });
        }
    }

    async mainInfluencerList(req: IGetUserAuthInfoRequest, res: Response) {
        const { influencerListDown } = req;
        return res
            .status(200)
            .send({ message: 'Success', result: influencerListDown });
    }

    async influencerImageList(req: IGetUserAuthInfoRequest, res: Response) {
        const { imageList, influencer } = req;
        return res
            .status(200)
            .send({ message: 'Success', result: influencer, imageList });
    }
}

const filterController = new FilterController();
export default filterController;
