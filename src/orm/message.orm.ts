import { NextFunction, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';
import { User } from '../entity/User';

class MessageOrmController {
    async sendMessageOrm(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const userId = req.userId;
        const brandname = await User.find({
            where: { id: userId.id },
            select: { user_brandname: true },
        });
        req.userBrand = brandname;
        return next();
    }
    2;
}

const messageOrmController = new MessageOrmController();
export default messageOrmController;
