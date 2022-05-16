import campaignController from '../controller/campaign.controller';
import tokenController from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';
import campaignormcontroller from '../orm/campaign.orm';
const express = require('express');
const router = express.Router();

router.use(wrapAsyncController(tokenController.verifyToken));
router.post(
    '/create-campaign',
    wrapAsyncController(campaignormcontroller.findCampaignWithCampaignName),
    wrapAsyncController(campaignController.createCampaign)
);

router.patch(
    '/update-message/:campaignid',
    wrapAsyncController(campaignormcontroller.findCampaignWithCampaignName),
    wrapAsyncController(campaignormcontroller.findCampiagnWithCampaignId),
    wrapAsyncController(campaignController.patchCampaign)
);

router.delete(
    '/delete-campaign/:campaignid',
    wrapAsyncController(campaignormcontroller.findCampiagnWithCampaignId),
    wrapAsyncController(campaignormcontroller.findMessageWithCampaignId),
    wrapAsyncController(campaignController.deleteCampaign)
);

router.delete(
    '/delete-influencer',
    wrapAsyncController(campaignController.deleteInfluencer)
);

export default router;
