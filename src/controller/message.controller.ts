import  config from "../config/config";
import { NextFunction, Request, Response} from "express"
import { Influencer } from "../entity/Influencer";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

const jwt = require('jsonwebtoken');


class MessageController {
    async send(req: Request, res: Response, next: NextFunction){
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        const {content, influencerIDs, campaignID} = req.body;
        const statusID = 1
        const newMessage = new Message()
        const brandname = await User.find({
            where:{id: userId.id},select:{user_brandname:true}
        })
        
        newMessage.campaignID = campaignID
        newMessage.statusID = statusID
        
        for ( const id of influencerIDs ) {
            const instagramId = await Influencer.find({
                where:{id: id}, select:{influencer_instagram_id: true}
            })
            const touch_content = `안녕하세요. ${instagramId[0].influencer_instagram_id}님 ${brandname[0].user_brandname}입니다.\n ` + content
            
            newMessage.influencerID = id
            newMessage.message_content = touch_content
 
            Message.getRepository().save(newMessage)
        }
        res.send({Message : 'create'})      
    }
}

const messagecontroller = new MessageController();
export default messagecontroller
