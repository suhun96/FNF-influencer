import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
    user: any;
    userId: any;
    campaign: any;
    campaignOne: any;
    campaignName: any;
    campaignId: any;
    message: any;
    userBrand: any;
    campaignCount: any;
    totalRequest: any;
    totalAccept: any;
    totalReject: any;
    totalWait: any;
    totalCount: any;
    acceptCount: any;
    waitCount: any;
    rejectCount: any;
    limitNumber: any;
    offsetNumber: any;
    influencerListDown: any;
    influencerListUp: any;
    sortOption: any;
    categoryList: any;
    influencerList: any;
    categoryId: any;
    sortBy: any;
}
