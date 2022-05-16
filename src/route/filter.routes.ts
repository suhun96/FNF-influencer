import filterController from '../controller/filter.controller';
import tokenController from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';
import filterOrmController from '../orm/filter.orm';

const express = require('express');
const router = express.Router();

router.get(
    '/user-campaign-list',
    wrapAsyncController(tokenController.verifyToken),
    wrapAsyncController(filterOrmController.userCampaignListOrm),
    wrapAsyncController(filterController.userCampaignList)
);
router.get(
    '/campaign-status-influencer-list',
    wrapAsyncController(tokenController.verifyToken),
    wrapAsyncController(filterOrmController.campaignStatusInfluencerListOrm),
    wrapAsyncController(filterController.campaignStatusInfluencerList)
);
router.get(
    '/campaign-total-status-influencer-list',
    wrapAsyncController(tokenController.verifyToken),
    wrapAsyncController(
        filterOrmController.campaignTotalStatusInfluencerListOrm
    ),
    wrapAsyncController(filterController.campaignTotalStatusInfluencerList)
);
router.get(
    '/category-list',
    wrapAsyncController(filterOrmController.categoryListOrm),
    wrapAsyncController(filterController.categoryList)
);
router.get(
    '/category-influencer-list',
    filterOrmController.categoryInfluencerListOrm,
    filterController.categoryInfluencerList
);

export default router;
