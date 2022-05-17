import { Response } from 'express';
import { Campaign } from '../entity/Campaign';
import { Message } from '../entity/Message';
import { IGetUserAuthInfoRequest } from '../definition';

class CampaignController {
    async createCampaign(req: IGetUserAuthInfoRequest, res: Response) {
        const userId = req.userId;
        const campaign = req.campaign;
        const campaignName = req.campaignName;
        if (campaign === null) {
            const myCampaign = new Campaign();
            myCampaign.userID = userId;
            myCampaign.campaign_name = campaignName;
            Campaign.getRepository().save(myCampaign);
            return res.status(201).send({ message: 'Success' });
        } else {
            return res.status(400).send({ message: 'Already exist name' });
        }
    }

    async patchCampaign(req: IGetUserAuthInfoRequest, res: Response) {
        const userId = req.userId;
        const campaign = req.campaign;
        const campaignOne = req.campaignOne;
        const campaignName = req.campaignName;
        campaign;
        if (campaign === null) {
            campaignOne;
            if (campaignOne !== null) {
                campaignOne.userID = userId;
                campaignOne.campaign_name = campaignName;
                await Campaign.save(campaignOne);
                return res.status(200).send({ message: 'Success' });
            } else {
                return res
                    .status(406)
                    .send({ message: 'Campaign does not exist' });
            }
        } else {
            return res
                .status(407)
                .send({ message: 'Already exist campaign name' });
        }
    }

    async deleteCampaign(req: IGetUserAuthInfoRequest, res: Response) {
        const campaign = req.campaignOne;
        const message = req.message;
        campaign;
        if (campaign !== null) {
            message;
            await Message.remove(message);
            await Campaign.remove(campaign);
            return res.status(200).send({ message: 'Success' });
        } else {
            return res.status(400).send({ message: 'Unauthorized' });
        }
    }

    async deleteInfluencer(req: IGetUserAuthInfoRequest, res: Response) {
        const userId = req.userId;
        const { influencerId, campaignId } = req.body;
        for (const id of influencerId) {
            const message = await Message.find({
                relations: { campaign: true },
                where: {
                    influencerID: id,
                    campaign: { id: campaignId, userID: userId },
                },
            });
            if (message) {
                await Message.remove(message);
                continue;
            } else {
                return res.status(405).send({ message: 'Unauthorized' });
            }
        }
        return res.status(200).send({ message: 'Success' });
    }
}

const campaignController = new CampaignController();
export default campaignController;
