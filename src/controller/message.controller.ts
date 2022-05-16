import { Response } from 'express';
import { Influencer } from '../entity/Influencer';
import { Message } from '../entity/Message';
import { IGetUserAuthInfoRequest } from '../definition';

class MessageController {
    async send(req: IGetUserAuthInfoRequest, res: Response) {
        const brandname = req.userBrand;
        const { content, influencerIDs, campaignID } = req.body;
        const statusID = 1;
        brandname;
        for (const id of influencerIDs) {
            const instagramId = await Influencer.find({
                where: { id: id },
                select: { influencer_instagram_id: true },
            });
            const duplicate = await Message.find({
                where: {
                    campaignID: campaignID,
                    influencerID: id,
                },
            });
            if (duplicate.length > 0) {
                return res
                    .status(406)
                    .send({ message: 'Already exist influencer' });
            } else {
                const touchContent =
                    `안녕하세요. ${instagramId[0].influencer_instagram_id}님 ${brandname[0].user_brandname}입니다.\n ` +
                    content;

                const newMessage = new Message();
                newMessage.campaignID = campaignID;
                newMessage.statusID = statusID;
                newMessage.influencerID = id;
                newMessage.message_content = touchContent;
                await Message.save(newMessage);
                continue;
            }
        }
        return res.status(200).send({ Message: 'create' });
    }
}

const messagecontroller = new MessageController();
export default messagecontroller;
