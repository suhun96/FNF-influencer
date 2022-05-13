import { Router } from 'express';
import userrouter from './user.routes';
import filter from './filter.routes';
import searchfilterrouter from './search.filter';
import campaignrouter from './campaign.routes';
import countfilter from './count.routes';

const router = Router();

router.use('/user', userrouter);
router.use('/filter', filter);
router.use('/search', searchfilterrouter);
router.use('/campaign', campaignrouter);
router.use('/count', countfilter);

export default router;
