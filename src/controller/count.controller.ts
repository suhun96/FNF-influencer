import { Request, Response } from 'express';
import { Campaign } from '../entity/Campaign';
import { Message } from '../entity/Message';
import { User } from '../entity/User';
import config from '../config/config';

const jwt = require('jsonwebtoken');

class countController {
    async totalInfluencerCount(req: Request, res: Response) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const userBrand = await User.findOne({
            select: ['user_brandname'],
            where: {
                id: userId.id,
            },
        });

        const campaignCount = await Campaign.count({
            where: {
                userID: userId.id,
            },
        });

        const totalRequest = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                campaign: {
                    userID: userId.id,
                },
            },
        });

        const totalAccept = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                statusID: 1,
                campaign: {
                    userID: userId.id,
                },
            },
        });

        const totalReject = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                statusID: 2,
                campaign: {
                    userID: userId.id,
                },
            },
        });

        const totalWait = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                statusID: 3,
                campaign: {
                    userID: userId.id,
                },
            },
        });
        return res.status(200).send({
            message: 'success',
            result: {
                brand: userBrand.user_brandname,
                campaignCount: campaignCount,
                totalRequest: totalRequest,
                totalAccept: totalAccept,
                totalReject: totalReject,
                totalWait: totalWait,
            },
        });
    }

    async campaignInfluencerCount(req: Request, res: Response) {
        const campaignId = parseInt(req.params.campaignId);
        const totalCount = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                campaign: {
                    id: campaignId,
                },
            },
        });

        const acceptCount = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                statusID: 1,
                campaign: {
                    id: campaignId,
                },
            },
        });

        const waitCount = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                statusID: 3,
                campaign: {
                    id: campaignId,
                },
            },
        });

        const rejectCount = await Message.count({
            relations: {
                campaign: true,
            },
            where: {
                statusID: 2,
                campaign: {
                    id: campaignId,
                },
            },
        });
        return res.status(200).send({
            message: 'Success',
            result: {
                totalCount: totalCount,
                acceptCount: acceptCount,
                waitCount: waitCount,
                rejectCount: rejectCount,
            },
        });
    }
}
const countcontroller = new countController();
export default countcontroller;
