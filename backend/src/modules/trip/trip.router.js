import express from "express";
import * as tripController from "./trip.controller.js";
const router = express.Router();
import upload from "../../../Middleware/upload.js";

// create new tour
router.post(
  "/:companyId",
  upload.array("photo", 10),
  tripController.createTour
);

// update  tour
router.put("/:id", upload.array("photo", 10), tripController.updateTour);

// delete  tour
router.delete("/:id", tripController.deleteTour);

router.put("/Stops/:id", tripController.deleteStops);

// get single  tour
router.get("/:id", tripController.getSingleTour);

// get All tour
router.get("/", tripController.getAllTour);

// get tour by search

router.get(
  "/search/:companyId/getTourBySearch",
  tripController.getTourBySearch
);

router.get("/search/getTourBySearch", tripController.SearchByTtile);

router.get("/company/:companyId", tripController.getCompanyTour);

router.post("/:tripId/:reviewId", tripController.createReview);

export default router;
