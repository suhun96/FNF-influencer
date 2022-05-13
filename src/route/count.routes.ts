import countcontroller from '../controller/count.controller';
import { verifyToken } from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';

const express = require('express');
const router = express.Router();

router.use(verifyToken);
router.get(
    '/total-influencer',
    wrapAsyncController(countcontroller.totalInfluencerCount)
);
router.get(
    '/campaign-influencer/:campaignId',
    wrapAsyncController(countcontroller.campaignInfluencerCount)
);

export default router;
