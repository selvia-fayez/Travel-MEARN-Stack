import Tour from "../../../models/Tour.js";
// create new tour

const createTour = async (req, res) => {
  try {
    const photo = req.files.map(
      (file) => `${req.protocol}://${req.get("host")}/uploads/` + file.filename
    );
    const newTour = new Tour({ ...req.body, photo });
    const savedTour = await newTour.save();
    res.status(200).json({
      success: true,
      message: "Successfully created tour",
      data: savedTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// update Tour
const updateTour = async (req, res) => {
  const id = req.params.id;
  try {
    let data = { ...req.body };
    if (req.files) {
      const photo = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/uploads/` + file.filename
      );
      data.photo = photo;
    }

    let updateTour = await Tour.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully Updated tour",
      data: updateTour,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed  to update  tour, just try again",
    });
  }
};
// delete Tour
const deleteTour = async (req, res) => {
  //const { id } = req.body;
  const id = req.params.id;
  try {
    await Tour.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Successfully Deleted tour" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed  to delete  tour, just try again",
    });
  }
};
// get single  Tour
const getSingleTour = async (req, res) => {
  const id = req.params.id;
  try {
    const tour = await Tour.findById(id).populate(
      "createdBy",
      "Company_name-_id"
    );
    res
      .status(200)
      .json({ success: true, message: "Successfully ", data: tour });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
// get All  Tours
const getAllTour = async (req, res) => {
  // for pagination
  // const page = parseInt(req.query.page);
  try {
    const tours = await Tour.find({}).populate("createdBy", "Company_name-_id");
    // .skip(page * 8)
    // .limit(8);

    res.status(200).json({
      success: true,
      message: "Successfully",
      count: tours.length,
      data: tours,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
// search tour
const getTourBySearch = async (req, res) => {
  const title = new RegExp(req.query.title, "i");
  const companyId = req.params.companyId;
  try {
    //  i means case sensitive
    // if (city !== "undefined") {
    //   const city = new RegExp(req.query.city, "i");
    // }
    // if (distance !== "undefined") {
    //   const distance = parseInt(req.query.distance);
    // }
    // if (maxGroupSize !== "undefined") {
    //   const maxGroupSize = parseInt(req.query.maxGroupSize);
    // }
    const tours = await Tour.find({ title: title, createdBy: companyId });
    // const tours = await Tour.find({
    //   city,
    //   distance: { $gte: distance },
    //   maxGroupSize: { $gte: maxGroupSize },
    // });
    res
      .status(200)
      .json({ success: true, message: "Successfully", data: tours });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not Found",
    });
  }
};
const getCompanyTour = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const tours = await Tour.find({
      createdBy: companyId,
    });
    res
      .status(200)
      .json({ success: true, message: "Successfully ", data: tours });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const createReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const tripId = req.params.tripId;
    const updatedReview = await Tour.findByIdAndUpdate(
      { _id: tripId },
      { $push: { reviews: reviewId } }
    );
    res.status(200).json({
      success: true,
      message: "Successfully added Review",
      updatedReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't add review",
    });
  }
};
export {
  getAllTour,
  updateTour,
  deleteTour,
  getSingleTour,
  createTour,
  getTourBySearch,
  getCompanyTour,
  createReview,
};
