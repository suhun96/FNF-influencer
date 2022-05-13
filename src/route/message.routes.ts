import messagecontroller from "../controller/message.controller";
import { verifyToken } from "../middleware/authtoken";
import wrapAsyncController from '../middleware/error';

const express = require('express');
const router = express.Router();

router.use(verifyToken);
router.post("/send", wrapAsyncController(messagecontroller.send))

export default router;