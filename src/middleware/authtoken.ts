import { Request, Response, NextFunction } from 'express';

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers.authorization;
    if (token) {
        next();
    } else {
        return res.status(403).send({ message: 'unauthorized' });
    }
};
