import { Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';
import { User } from '../entity/User';
import * as bcrypt from 'bcrypt';
import config from '../config/config';

const jwt = require('jsonwebtoken');

class UserController {
    async signUp(req: Request, res: Response) {
        const { email, password, brandname } = req.body;
        const myUser = new User();
        myUser.user_email = email;
        myUser.user_brandname = brandname;
        myUser.user_password = bcrypt.hashSync(password, 10);
        await User.getRepository().save(myUser);
        return res.status(201).send({ message: 'Success', result: myUser });
    }

    async checkUserEmail(req: Request, res: Response) {
        const { email } = req.body;
        const user = await User.findOne({
            where: {
                user_email: email,
            },
        });
        if (user) {
            return res.status(404).send({ message: 'Already exist email' });
        } else {
            return res.status(200).send({ message: 'Success' });
        }
    }

    async signIn(req: IGetUserAuthInfoRequest, res: Response) {
        const userId = req.userId;
        const token = jwt.sign({ id: userId }, config.auth.secret, {
            expiresIn: '15d',
        });
        return res.status(200).send({ message: 'Login success', token: token });
    }
}

const userController = new UserController();
export default userController;
