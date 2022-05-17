import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class FilterController {
    async userCampaignList(req: IGetUserAuthInfoRequest, res: Response) {
        const userCampaignList = req.campaign;
        return res
            .status(200)
            .send({ message: 'Success', result: userCampaignList });
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
                .send({ message: 'InfluencerList', result: influencerListUp });
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
                .send({ message: 'Success', result: influencerListDown });
        } else {
            influencerListUp;
            return res
                .status(200)
                .send({ message: 'Success', result: influencerListUp });
        }
    }

    async categoryList(req: IGetUserAuthInfoRequest, res: Response) {
        const categoryList = req.categoryList;
        res.status(200).send({
            message: 'Success',
            result: categoryList,
        });
    }

    async categoryInfluencerList(req: IGetUserAuthInfoRequest, res: Response) {
        const sortOption = req.sortOption;
        const influencerListDown = req.influencerListDown;
        const influencerListUp = req.influencerListUp;
        if (sortOption === 'down') {
            influencerListDown;
            return res
                .status(200)
                .send({ message: 'Success', result: influencerListDown });
        } else {
            influencerListUp;
            return res
                .status(200)
                .send({ message: 'Success', result: influencerListUp });
        }
    }

    async mainInfluencerList(req: IGetUserAuthInfoRequest, res: Response) {
        const influencerListDown = req.influencerListDown;
        influencerListDown;
        return res
            .status(200)
            .send({ message: 'Success', result: influencerListDown });
    }

    async influencerImageList(req: IGetUserAuthInfoRequest, res: Response) {
        const imageList = req.imageList;
        const influencer = req.influencer;
        imageList;
        influencer;
        return res
            .status(200)
            .send({ message: 'Success', result: influencer, imageList });
    }
}

const filterController = new FilterController();
export default filterController;
