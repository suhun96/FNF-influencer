import requestControl from '../controller/request.controller';
import wrapAsyncController from '../middleware/error';
import requestOrmController from '../orm/request.orm';
const express = require('express');
const router = express.Router();

router.post(
    '/send',
    wrapAsyncController(requestOrmController.sendOrm),
    wrapAsyncController(requestControl.send)
);
router.post(
    '/change',
    wrapAsyncController(requestOrmController.changeOrm),
    wrapAsyncController(requestControl.change)
);

export default router;
