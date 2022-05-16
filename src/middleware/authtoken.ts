import { Response, NextFunction } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';
import config from '../config/config';

const jwt = require('jsonwebtoken');
class TokenController {
    async verifyToken(
        req: IGetUserAuthInfoRequest,
        res: Response,
        next: NextFunction
    ) {
        const token = req.headers.authorization;
        const userId = await jwt.verify(token, config.auth.secret);
        if (token) {
            req.userId = userId;
            next();
        } else {
            return res.status(403).send({ message: 'unauthorized' });
        }
    }
}

const tokenController = new TokenController();
export default tokenController;
