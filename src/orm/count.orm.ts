import { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';
import { Campaign } from '../entity/Campaign';
import { Message } from '../entity/Message';
import { User } from '../entity/User';

class CountOrmController {
    async countInfluencerWithUserId(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const { userId } = req;
        const userBrand = await User.findOne({
            select: ['user_brandname'],
            where: { id: userId },
        });

        const campaignCount = await Campaign.count({
            where: { userID: userId },
        });

        const totalRequestCount = await Message.count({
            relations: { campaign: true },
            where: {
                campaign: { userID: userId },
            },
        });

        const totalAcceptCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 2,
                campaign: { userID: userId },
            },
        });

        const totalRejectCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 3,
                campaign: { userID: userId },
            },
        });

        const totalWaitCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 1,
                campaign: { userID: userId },
            },
        });
        req.userBrandName = userBrand.user_brandname;
        req.campaignCount = campaignCount;
        req.totalRequestCount = totalRequestCount;
        req.totalAcceptCount = totalAcceptCount;
        req.totalRejectCount = totalRejectCount;
        req.totalWaitCount = totalWaitCount;
        next();
    }

    async countInfluencerWithCampaignId(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const campaignId = parseInt(req.params.campaignId);
        const totalInlfuencerCount = await Message.count({
            relations: { campaign: true },
            where: {
                campaign: { id: campaignId },
            },
        });

        const acceptInlfuencerCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 2,
                campaign: { id: campaignId },
            },
        });

        const waitInlfuencerCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 1,
                campaign: { id: campaignId },
            },
        });

        const rejectInlfuencerCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 3,
                campaign: { id: campaignId },
            },
        });
        req.totalInlfuencerCount = totalInlfuencerCount;
        req.acceptInlfuencerCount = acceptInlfuencerCount;
        req.waitInlfuencerCount = waitInlfuencerCount;
        req.rejectInlfuencerCount = rejectInlfuencerCount;
        next();
    }
}

const countOrmController = new CountOrmController();
export default countOrmController;
