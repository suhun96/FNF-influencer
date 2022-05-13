import searchController from '../controller/search.filter';
import { verifyToken } from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';

const express = require('express');
const router = express.Router();

router.use(verifyToken);
router.get('', wrapAsyncController(searchController.search));

export default router;
