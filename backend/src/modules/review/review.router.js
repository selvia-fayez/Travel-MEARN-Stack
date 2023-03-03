import express from "express";
import * as reviewController from "./review.controller.js";
const router = express.Router();

router.post("/:tripID", reviewController.AddReview);

router.get("/reviewById/:reviewId", reviewController.getReviewbyID);

router.get("/:tripId", reviewController.getTripReview);

export default router;
