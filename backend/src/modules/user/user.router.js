import express from "express";
import * as userController from "./user.controller.js";
const router = express.Router();

router.post("/signup", userController.SignUp);
router.post("/signin", userController.SignIn);
router.post("/cart/:userId", userController.addToCart);
router.delete("/cart/:userId", userController.deleteFromCart);
router.post("/favorite/:userId", userController.addToFavorite);
router.delete("/favorite/:userId", userController.deleteFromFavorite);
router.get("/favorite/:userId", userController.getUserFavorite);
router.get("/cart/:userId", userController.getUserCart);
router.put("/cart/:userID/:tripID", userController.ChangeQuantity);
router.delete("/cartAfterPay/:userId", userController.deleteCartAfterPay);

export default router;
