import { Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

const jwt = require('jsonwebtoken');
class TokenController {
    async verifyToken(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization;
        const user = await jwt.verify(token, process.env.SECRET_KEY);
        if (token) {
            const userId = user.id;
            req.userId = userId;
            next();
        } else {
            return res.status(403).send({ message: 'unauthorized' });
        }
    }
}

const tokenController = new TokenController();
export default tokenController;
