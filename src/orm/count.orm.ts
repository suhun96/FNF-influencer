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
        const userId = req.userId;
        const userBrand = await User.findOne({
            select: ['user_brandname'],
            where: { id: userId.id },
        });

        const campaignCount = await Campaign.count({
            where: { userID: userId.id },
        });

        const totalRequest = await Message.count({
            relations: { campaign: true },
            where: {
                campaign: { userID: userId.id },
            },
        });

        const totalAccept = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 2,
                campaign: { userID: userId.id },
            },
        });

        const totalReject = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 3,
                campaign: { userID: userId.id },
            },
        });

        const totalWait = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 1,
                campaign: { userID: userId.id },
            },
        });
        req.userBrand = userBrand;
        req.campaignCount = campaignCount;
        req.totalRequest = totalRequest;
        req.totalAccept = totalAccept;
        req.totalReject = totalReject;
        req.totalWait = totalWait;
        return next();
    }

    async countInfluencerWithCampaignId(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const campaignId = parseInt(req.params.campaignId);
        const totalCount = await Message.count({
            relations: { campaign: true },
            where: {
                campaign: { id: campaignId },
            },
        });

        const acceptCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 2,
                campaign: { id: campaignId },
            },
        });

        const waitCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 1,
                campaign: { id: campaignId },
            },
        });

        const rejectCount = await Message.count({
            relations: { campaign: true },
            where: {
                statusID: 3,
                campaign: { id: campaignId },
            },
        });
        req.totalCount = totalCount;
        req.acceptCount = acceptCount;
        req.waitCount = waitCount;
        req.rejectCount = rejectCount;
        return next();
    }
}

const countOrmController = new CountOrmController();
export default countOrmController;
