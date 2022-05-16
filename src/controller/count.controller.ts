import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class countController {
    async totalInfluencerCount(req: IGetUserAuthInfoRequest, res: Response) {
        const userBrand = req.userBrand;
        const campaignCount = req.campaignCount;
        const totalRequest = req.totalRequest;
        const totalAccept = req.totalAccept;
        const totalReject = req.totalReject;
        const totalWait = req.totalWait;
        return res.status(200).send({
            message: 'success',
            result: {
                brand: userBrand.user_brandname,
                campaignCount: campaignCount,
                totalRequest: totalRequest,
                totalAccept: totalAccept,
                totalReject: totalReject,
                totalWait: totalWait,
            },
        });
    }

    async campaignInfluencerCount(req: IGetUserAuthInfoRequest, res: Response) {
        const totalCount = req.totalCount;
        const acceptCount = req.acceptCount;
        const waitCount = req.waitCount;
        const rejectCount = req.rejectCount;
        return res.status(200).send({
            message: 'Success',
            result: {
                totalCount: totalCount,
                acceptCount: acceptCount,
                waitCount: waitCount,
                rejectCount: rejectCount,
            },
        });
    }
}
const countcontroller = new countController();
export default countcontroller;
