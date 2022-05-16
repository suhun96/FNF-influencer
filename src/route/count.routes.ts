import countcontroller from '../controller/count.controller';
import tokenController from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';
import countOrmController from '../orm/count.orm';

const express = require('express');
const router = express.Router();

router.use(wrapAsyncController(tokenController.verifyToken));
router.get(
    '/total-influencer',
    wrapAsyncController(countOrmController.countInfluencerWithUserId),
    wrapAsyncController(countcontroller.totalInfluencerCount)
);
router.get(
    '/campaign-influencer/:campaignId',
    wrapAsyncController(countOrmController.countInfluencerWithCampaignId),
    wrapAsyncController(countcontroller.campaignInfluencerCount)
);

export default router;
