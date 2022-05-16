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
            where: { id: userId.id },
            select: { user_brandname: true },
        });
        const influencerList1 = await Influencer.find({
            where: { id: In(influencerIDs) },
            select: ['id'],
        });
        const influencerList2 = await Influencer.find({
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
        const influencerIdList1 = influencerList1.map(item => item.id);
        const influencerIdList2 = influencerList2.map(item => item.id);
        let influencerIdList3 = influencerIdList1
            .filter(item => !influencerIdList2.includes(item))
            .concat(
                influencerIdList2.filter(
                    item => !influencerIdList1.includes(item)
                )
            );
        req.userBrand = brandname;
        req.influencerList1 = influencerList1;
        req.influencerList2 = influencerList2;
        req.influencerIdList1 = influencerIdList1;
        req.influencerIdList2 = influencerIdList2;
        req.influencerIdList3 = influencerIdList3;
        req.content = content;
        req.campaignId = campaignID;
        return next();
    }
}

const messageOrmController = new MessageOrmController();
export default messageOrmController;
