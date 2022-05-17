import { NextFunction, Request, Response} from "express"
import AppDataSource from "../data-source"
import { Campaign } from "../entity/Campaign"
import { Influencer } from "../entity/Influencer"
import { Message } from "../entity/Message"
import { User } from "../entity/User"

class RequestControl {
    async send(req: Request, res:Response, next: NextFunction){
        const { messageID } = req.body
        const ID = parseInt(messageID)
            const list = await AppDataSource
            .getRepository(Message)
            .createQueryBuilder("message")
            .where("message.id = :id", {id: ID})
            .getOne()
    
            const campaign = await AppDataSource
            .getRepository(Campaign)
            .createQueryBuilder("campaign")
            .where("campaign.id = :id", {id: list.campaignID})
            .getOne()
    
            const brand = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.id = :id", {id: campaign.userID})
            .getOne()
    
            const instagram = await AppDataSource
            .getRepository(Influencer)
            .createQueryBuilder("influencer")
            .where("influencer.id = :id",{ id : list.influencerID})
            .getOne()
            
        return res.status(200).send({
            messageID : ID,
            influencerID : list.influencerID, 
            instagramID : instagram.influencer_instagram_id,
            message_content : list.message_content,
            brand : brand.user_brandname
        })
        }
    async change(req:Request, res:Response, next:NextFunction){
        const { statusID , messageID, influencerID } = req.body
        const ID = parseInt(messageID)
        let status : number = statusID
        
        if (status === 2) {
            await AppDataSource
                .createQueryBuilder()
                .update(Message)
                .set({statusID: 2})
                .where({id: messageID, influencerID: influencerID})
                .execute()
            return res.status(200).send({Message:"Influencer has accepted your request."})       
        }
        
        if (status === 3 ) {
            await AppDataSource
                .createQueryBuilder()
                .update(Message)
                .set({statusID: 3})
                .where({id: messageID, influencerID: influencerID})
                .execute()
            return res.status(200).send({Message:"Influencer has declined your request."})
        }
    }
}

const requestControl = new RequestControl();
export default requestControl 