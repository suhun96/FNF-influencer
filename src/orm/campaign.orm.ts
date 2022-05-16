import { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';
import { Campaign } from '../entity/Campaign';
import { Message } from '../entity/Message';

class CampaignOrmController {
    async findCampaignWithCampaignName(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const { campaignName } = req.body;
        const campaign = await Campaign.findOne({
            where: {
                userID: userId.id,
                campaign_name: campaignName,
            },
        });
        req.campaignOne = campaign;
        req.campaignName = campaignName;
        return next();
    }

    async findCampiagnWithCampaignId(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const { campaignName } = req.body;
        const campaignId = parseInt(req.params.campaignid);
        const campaign = await Campaign.findOne({
            where: {
                id: campaignId,
                userID: userId.id,
            },
        });
        req.campaign = campaign;
        req.campaignName = campaignName;
        return next();
    }

    async findMessageWithCampaignId(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const campaignId = parseInt(req.params.campaignid);
        const message = await Message.find({
            relations: {
                campaign: true,
            },
            where: {
                campaignID: campaignId,
                campaign: {
                    userID: userId.id,
                },
            },
        });
        req.message = message;
        return next();
    }
}

const campaignormcontroller = new CampaignOrmController();
export default campaignormcontroller;
