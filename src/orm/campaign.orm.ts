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
        const { userId } = req;
        const { campaignName } = req.body;
        const campaign = await Campaign.findOne({
            where: { userID: userId, campaign_name: campaignName },
        });
        req.campaign = campaign;
        req.campaignName = campaignName;
        next();
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
            where: { id: campaignId, userID: userId },
        });
        req.campaignOne = campaign;
        req.campaignName = campaignName;
        next();
    }

    async findMessageWithCampaignId(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const { userId } = req;
        const campaignId = parseInt(req.params.campaignid);
        const message = await Message.find({
            relations: { campaign: true },
            where: {
                campaignID: campaignId,
                campaign: { userID: userId },
            },
        });
        req.messageList = message;
        next();
    }
}

const campaignormcontroller = new CampaignOrmController();
export default campaignormcontroller;
