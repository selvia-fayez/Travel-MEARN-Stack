import mongoose from "mongoose";
const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Company",
    },
    photo: {
      type: Array,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    reviews: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    totalPrice: {
      type: Number,
    },
    totalQuantity: {
      type: Number,
    },
    availableSeats: {
      type: Number,
    },
    stops: { type: [], default: [] },
  },
  { timestamps: true }
);
export default mongoose.model("Tour", tourSchema);
