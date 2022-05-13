import { NextFunction, Request, Response } from 'express';
import { Campaign } from '../entity/Campaign';
import { Message } from '../entity/Message';
import config from '../config/config';
const jwt = require('jsonwebtoken');

class CampaignController {
    async createCampaign(req: Request, res: Response, next: NextFunction) {
        var token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const { campaignName } = req.body;
        const myCampaign = new Campaign();
        const duplicate = await Campaign.findOne({
            where: {
                userID: userId.id,
                campaign_name: campaignName,
            },
        });
        if (duplicate === null) {
            myCampaign.userID = userId.id;
            myCampaign.campaign_name = campaignName;
            Campaign.getRepository().save(myCampaign);
            return res.status(201).send({ message: 'created campaign' });
        } else {
            return res.status(400).send({ message: 'Already exist name' });
        }
    }

    async patchCampaign(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const { campaignName } = req.body;
        const campaignId = parseInt(req.params.campaignid);
        const myMessage = await Campaign.findOne({
            where: {
                id: campaignId,
                userID: userId.id,
            },
        });
        myMessage.campaign_name = campaignName;
        await Campaign.save(myMessage);
        return res.status(200).send({ message: 'Patch success' });
    }

    async deleteCampaign(req: Request, res: Response, next: NextFunction) {
        var token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const campaignId = parseInt(req.params.campaignid);
        const myMessage = await Message.find({
            where: {
                campaignID: campaignId,
            },
        });
        const myCampaign = await Campaign.find({
            where: {
                id: campaignId,
            },
        });
        await Message.remove(myMessage);
        await Campaign.remove(myCampaign);
        return res.status(200).send({ message: 'Delete success' });
    }

    async deleteInfluencer(req: Request, res: Response, next: NextFunction) {
        const campaignId = parseInt(req.params.campaignid);
        const influencerId = parseInt(req.params.influencerid);
        const myMessage = await Message.findOneBy({
            campaignID: campaignId,
            influencerID: influencerId,
        });
        await Message.remove(myMessage);
        return res.status(200).send({ message: 'Delete success' });
    }
}

const campaignController = new CampaignController();
export default campaignController;
