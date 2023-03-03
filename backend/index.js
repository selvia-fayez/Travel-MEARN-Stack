import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import tourRouter from "./src/modules/trip/trip.router.js";
import userRouter from "./src/modules/user/user.router.js";
import companyRouter from "./src/modules/company/company.router.js";
import { connect } from "./database/dbconnection.js";
import bookingRouter from "./src/modules/booking/booking.router.js";
import reviewRouter from "./src/modules/review/review.router.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static(path.join("./uploads")));
app.use("/tours", tourRouter);
app.use("/users", userRouter);
app.use("/company", companyRouter);
app.use("/checkout", bookingRouter);
app.use("/review", reviewRouter);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}!`);
});
