import { NextFunction, Request, Response } from 'express';
import { Campaign } from '../entity/Campaign';
import { Message } from '../entity/Message';
import config from '../config/config';
const jwt = require('jsonwebtoken');

class CampaignController {
    async createCampaign(req: Request, res: Response) {
        var token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const { campaignName } = req.body;
        const myCampaign = new Campaign();
        const campaign = await Campaign.findOne({
            where: {
                userID: userId.id,
                campaign_name: campaignName,
            },
        });
        if (campaign === null) {
            myCampaign.userID = userId.id;
            myCampaign.campaign_name = campaignName;
            Campaign.getRepository().save(myCampaign);
            return res.status(201).send({ message: 'created campaign' });
        } else {
            return res.status(400).send({ message: 'Already exist name' });
        }
    }

    async patchCampaign(req: Request, res: Response) {
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
        console.log(myMessage);
        myMessage.campaign_name = campaignName;
        await Campaign.save(myMessage);
        return res.status(200).send({ message: 'Patch success' });
    }

    async deleteCampaign(req: Request, res: Response) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const campaignId = parseInt(req.params.campaignid);
        const myCampaign = await Campaign.find({
            where: {
                id: campaignId,
                userID: userId.id,
            },
        });
        if (myCampaign.length !== 0) {
            const myMessage = await Message.find({
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
            await Message.remove(myMessage);
            await Campaign.remove(myCampaign);
            return res.status(200).send({ message: 'Delete success' });
        } else {
            return res.status(400).send({ message: 'Unauthorized' });
        }
    }

    async deleteInfluencer(req: Request, res: Response) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const campaignId = parseInt(req.params.campaignid);
        const influencerId = parseInt(req.params.influencerid);
        const myMessage = await Message.find({
            relations: {
                campaign: true,
            },
            where: {
                campaignID: campaignId,
                influencerID: influencerId,
                campaign: {
                    userID: userId,
                },
            },
        });
        await Message.remove(myMessage);
        return res.status(200).send({ message: 'Delete success' });
    }
}

const campaignController = new CampaignController();
export default campaignController;
