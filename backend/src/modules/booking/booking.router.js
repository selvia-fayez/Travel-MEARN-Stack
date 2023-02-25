import express from 'express'

import * as bookingController from "./bookingController.js";
const router = express.Router();

router.post('/', bookingController.addInvoice);

export default router;