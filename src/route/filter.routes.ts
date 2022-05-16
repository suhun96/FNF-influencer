import filterController from '../controller/filter.controller';
import tokenController from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';
import filterOrmController from '../orm/filter.orm';

const express = require('express');
const router = express.Router();

router.get(
    '/user-campaign-list',
    wrapAsyncController(tokenController.verifyToken),
    wrapAsyncController(filterOrmController.findUserCampaignList),
    wrapAsyncController(filterController.userCampaignList)
);
router.get(
    '/campaign-status-influencer-list',
    wrapAsyncController(tokenController.verifyToken),
    wrapAsyncController(filterOrmController.findCampaignStatusInfluencerList),
    wrapAsyncController(filterController.campaignStatusInfluencerList)
);
router.get(
    '/campaign-total-status-influencer-list',
    wrapAsyncController(tokenController.verifyToken),
    wrapAsyncController(
        filterOrmController.findCampaignTotalStatusInfluencerList
    ),
    wrapAsyncController(filterController.campaignTotalStatusInfluencerList)
);
router.get(
    '/category-list',
    wrapAsyncController(filterOrmController.findCategoryList),
    wrapAsyncController(filterController.categoryList)
);
router.get(
    '/category-influencer-list',
    wrapAsyncController(tokenController.verifyToken),
    filterOrmController.findAndCountCategoryInfluencerList,
    filterController.categoryInfluencerList
);

router.get(
    '/influencer-image/:influencerId',
    filterOrmController.findInfluencerImageList,
    filterController.influencerImageList
);

router.get(
    '/main',
    filterOrmController.mainInfluencerList,
    filterController.mainInfluencerList
);

export default router;
