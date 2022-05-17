import { Response } from 'express';
import { Influencer } from '../entity/Influencer';
import { Message } from '../entity/Message';
import { IGetUserAuthInfoRequest } from '../definition';

class MessageController {
    async send(req: IGetUserAuthInfoRequest, res: Response) {
        const content = req.content;
        const campaignId = req.campaignId;
        const statusID = 1;
        const brandName = req.userBrandName;
        const influencerIdList = req.influencerIdList;
        const influencerIdList1 = req.influencerIdList1;
        const influencerIdList2 = req.influencerIdList2;

        influencerIdList2;
        if (
            influencerIdList.length > 0 &&
            influencerIdList1.length > 0 &&
            influencerIdList2.length === 0
        ) {
            return res
                .status(406)
                .send({ message: 'Already exist influencer' });
        } else {
            for (const id of influencerIdList2) {
                const influencer = await Influencer.findOne({
                    where: {
                        id: id,
                    },
                });
                const newMessage = new Message();
                const touchContent =
                    `안녕하세요. ${influencer.influencer_instagram_id}님 ${brandName}입니다.\n ` +
                    content;
                newMessage.campaignID = campaignId;
                newMessage.statusID = statusID;
                newMessage.influencerID = influencer.id;
                newMessage.message_content = touchContent;
                await Message.save(newMessage);
                continue;
            }
        }
        return res.status(200).send({ Message: 'Success' });
    }
}

const messagecontroller = new MessageController();
export default messagecontroller;
