import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    tripId:{
      type: mongoose.Types.ObjectId,
      ref:"Tour",
    },
    title: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Review", reviewSchema);
