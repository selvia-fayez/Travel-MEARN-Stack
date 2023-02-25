import express from "express";
import * as userController from "./trip.controller.js";
const router = express.Router();
import upload from "../../../Middleware/upload.js";

// create new tour
router.post("/", upload.single("photo"), userController.createTour);

// update  tour
router.put("/:id", userController.updateTour);

// delete  tour
router.delete("/:id", userController.deleteTour);

// get single  tour
router.get("/:id", userController.getSingleTour);

// get All tour
router.get("/", userController.getAllTour);

// get tour by search

router.get("/search/getTourBySearch", userController.getTourBySearch);

router.get("/company/:companyId", userController.getCompanyTour);

export default router;
