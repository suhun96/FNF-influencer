import filterController from '../controller/filter.controller';
import { verifyToken } from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';

const express = require('express');
const router = express.Router();

router.use(verifyToken);
router.get(
    '/user-campaign-list',
    wrapAsyncController(filterController.userCampaignList)
);
router.get(
    '/campaign-status-influencer-list',
    wrapAsyncController(filterController.campaignStatusInfluencerList)
);
router.get(
    '/campaign-total-status-influencer-list',
    wrapAsyncController(filterController.campaignTotalStatusInfluencerList)
);
router.get(
    '/category-list',
    wrapAsyncController(filterController.categoryList)
);
router.get(
    '/category-influencer-list',
    wrapAsyncController(filterController.categoryInfluencerList)
);

export default router;
