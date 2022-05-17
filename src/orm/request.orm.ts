import { NextFunction, Response } from 'express';
import { In } from 'typeorm';
import AppDataSource from '../data-source';
import { IGetUserAuthInfoRequest } from '../definition';
import { Message } from '../entity/Message';
import { Campaign } from '../entity/Campaign';
import { User } from '../entity/User';
import { Influencer } from '../entity/Influencer';

class RequestOrmController {
    async sendOrm(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const { messageID } = req.body
        const ID = parseInt(messageID)
        const message = await AppDataSource
            .getRepository(Message)
            .createQueryBuilder("message")
            .where("message.id = :id", {id: ID})
            .getOne()
        
        const campaign = await AppDataSource
            .getRepository(Campaign)
            .createQueryBuilder("campaign")
            .where("campaign.id = :id", {id: message.campaignID})
            .getOne()

        const brand = await AppDataSource
            .getRepository(User)
            .createQueryBuilder("user")
            .where("user.id = :id", {id: campaign.userID})
            .getOne()

        const instagram = await AppDataSource
            .getRepository(Influencer)
            .createQueryBuilder("influencer")
            .where("influencer.id = :id",{ id : message.influencerID})
            .getOne()
    
        
            req.messageId = ID,
            req.influencerId = message.influencerID, 
            req.instagramId = instagram.influencer_instagram_id,
            req.message = message.message_content,
            req.userBrandName =  brand.user_brandname
            next();
    }
    async changeOrm(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const { statusID , messageID, influencerID } = req.body
        const ID = parseInt(messageID) 

        req.messageId = ID,
        req.statusId = statusID,
        req.influencerId = influencerID
        next();
    }
}

const requestOrmController = new RequestOrmController();
export default requestOrmController