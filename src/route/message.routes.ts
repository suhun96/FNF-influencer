import messagecontroller from '../controller/message.controller';
import tokenController from '../middleware/authtoken';
import wrapAsyncController from '../middleware/error';
import messageOrmController from '../orm/message.orm';

const express = require('express');
const router = express.Router();

router.use(wrapAsyncController(tokenController.verifyToken));
router.post(
    '/send',
    wrapAsyncController(messageOrmController.sendMessageOrm),
    wrapAsyncController(messagecontroller.send)
);

export default router;
