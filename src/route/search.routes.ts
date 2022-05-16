import searchController from '../controller/search.controller';
import tokenController from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';
import searchOrmController from '../orm/search.orm';

const express = require('express');
const router = express.Router();

router.use(wrapAsyncController(tokenController.verifyToken));
router.get(
    '',
    wrapAsyncController(searchOrmController.searchOrm),
    wrapAsyncController(searchController.search)
);

export default router;
