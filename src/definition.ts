import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
    user: object;
    userId: number;
    campaign: object;
    campaignName: string;
    userBrandName: string;
    campaignCount: number;
    totalRequestCount: number;
    totalAcceptCount: number;
    totalRejectCount: number;
    totalWaitCount: number;
    totalInlfuencerCount: number;
    acceptInlfuencerCount: number;
    waitInlfuencerCount: number;
    rejectInlfuencerCount: number;
    sortOption: string;
    influencerListDown: object;
    influencerListUp: object;
    categoryList: object;
    influencerList: object;
    imageList: object;
    campaignId: number;
    content: string;
    influencer: object;
    influencerIdList: Array<number>;
    influencerIdList1: Array<number>;
    influencerIdList2: Array<number>;
    // 수훈
    messageId: number;
    influencerId : number;
    instagramId : string;
    campaignOne: any;
    statusId : number;
    message: any;
}
