import express from "express";
import * as companyController from "./company.controller.js";
const router = express.Router();
router.get("/:companyId", companyController.getCompanyInfo);

router.post("/signup", companyController.SignUp);

router.post("/signin", companyController.SignIn);

router.put("/:companyId", companyController.UpdatePackage);
export default router;
