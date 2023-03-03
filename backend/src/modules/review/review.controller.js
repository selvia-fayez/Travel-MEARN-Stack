import Review from "../../../models/Review.js";
import Tour from "../../../models/Tour.js";

const AddReview = async (req, res) => {
  try {
    const tripID = req.params.tripID;
    const newReview = new Review({ ...req.body, tripId: tripID });
    const savedReview = await newReview.save();
    res.status(200).json({
      success: true,
      message: "Successfully added Review",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getTripReview = async (req, res) => {
  try {
    const tripID = req.params.tripId;
    // const trip = await Tour.findById(tripID)
    //   .populate({ path: "reviews" })
    //   .select("reviews");
    // console.log(trip);
    const review = await Review.find({ tripId: tripID }).populate([
      { path: "createdBy", select: "User_name-_id" },
    ]);
    let totalRate = 0,
      sum = 0;
    for (let item of review) {
      sum += item.rating;
    }
    totalRate = sum / review.length;
    res.status(200).json({
      success: true,
      review,
      totalRate,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getReviewbyID = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId).populate([
      { path: "createdBy", select: "User_name-_id" },
    ]);
    res.status(200).json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { AddReview, getTripReview, getReviewbyID };
