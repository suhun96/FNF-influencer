import { NextFunction, Response } from 'express';
import { In } from 'typeorm';
import { IGetUserAuthInfoRequest } from '../definition';
import { Influencer } from '../entity/Influencer';
import { User } from '../entity/User';

class MessageOrmController {
    async sendMessageOrm(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const { content, influencerIDs, campaignID } = req.body;
        const brandname = await User.findOne({
            where: { id: userId },
            select: { user_brandname: true },
        });

        const influencerList = await Influencer.find({
            where: { id: In(influencerIDs) },
            select: ['id'],
        });

        const influencerList1 = await Influencer.find({
            relations: {
                messages: {
                    campaign: true,
                },
            },
            where: {
                messages: {
                    campaignID: campaignID,
                    influencerID: In(influencerIDs),
                },
            },
            select: ['id'],
        });
        const influencerIdList = influencerList.map(item => item.id);
        const influencerIdList1 = influencerList1.map(item => item.id);
        const influencerIdList2 = influencerIdList
            .filter(item => !influencerIdList1.includes(item))
            .concat(
                influencerIdList1.filter(
                    item => !influencerIdList.includes(item)
                )
            );
        req.userBrandName = brandname.user_brandname;
        req.content = content;
        req.campaignId = campaignID;
        req.influencerIdList = influencerIdList;
        req.influencerIdList1 = influencerIdList1;
        req.influencerIdList2 = influencerIdList2;
        next();
    }
}

const messageOrmController = new MessageOrmController();
export default messageOrmController;
