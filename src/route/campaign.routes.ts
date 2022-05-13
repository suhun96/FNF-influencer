import campaignController from '../controller/campaign.controller';
import { verifyToken } from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';

const express = require('express');
const router = express.Router();

router.use(verifyToken);
router.post(
    '/create-campaign',
    wrapAsyncController(campaignController.createCampaign)
);
router.patch(
    '/update-message/:campaignid',
    wrapAsyncController(campaignController.patchCampaign)
);

router.delete(
    '/delete-campaign/:campaignid',
    wrapAsyncController(campaignController.deleteCampaign)
);

router.delete(
    '/deletein-fluencer/:campaignid/:influencerid',
    wrapAsyncController(campaignController.deleteInfluencer)
);

export default router;
