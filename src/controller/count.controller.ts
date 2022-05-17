import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class countController {
    async totalInfluencerCount(req: IGetUserAuthInfoRequest, res: Response) {
        const {
            userBrandName,
            campaignCount,
            totalRequestCount,
            totalAcceptCount,
            totalRejectCount,
            totalWaitCount,
        } = req;
        return res.status(200).send({
            message: 'Success',
            result: {
                brand: userBrandName,
                campaignCount: campaignCount,
                totalRequest: totalRequestCount,
                totalAccept: totalAcceptCount,
                totalReject: totalRejectCount,
                totalWait: totalWaitCount,
            },
        });
    }

    async campaignInfluencerCount(req: IGetUserAuthInfoRequest, res: Response) {
        const {
            totalInlfuencerCount,
            acceptInlfuencerCount,
            waitInlfuencerCount,
            rejectInlfuencerCount,
        } = req;
        return res.status(200).send({
            message: 'Success',
            result: {
                totalCount: totalInlfuencerCount,
                acceptCount: acceptInlfuencerCount,
                waitCount: waitInlfuencerCount,
                rejectCount: rejectInlfuencerCount,
            },
        });
    }
}
const countcontroller = new countController();
export default countcontroller;
