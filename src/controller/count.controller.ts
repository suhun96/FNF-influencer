import { Response } from 'express';
import { IGetUserAuthInfoRequest } from '../definition';

class countController {
    async totalInfluencerCount(req: IGetUserAuthInfoRequest, res: Response) {
        const userBrandName = req.userBrandName;
        const campaignCount = req.campaignCount;
        const totalRequestCount = req.totalRequestCount;
        const totalAcceptCount = req.totalAcceptCount;
        const totalRejectCount = req.totalRejectCount;
        const totalWaitCount = req.totalWaitCount;
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
        const totalInlfuencerCount = req.totalInlfuencerCount;
        const acceptInlfuencerCount = req.acceptInlfuencerCount;
        const waitInlfuencerCount = req.waitInlfuencerCount;
        const rejectInlfuencerCount = req.rejectInlfuencerCount;
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
