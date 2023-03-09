import User from "../../../models/User.js";
import Tour from "../../../models/Tour.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTooken.js";

const SignUp = async (req, res) => {
  const { User_name, Email, Password, Phone } = req.body;
  const user = await User.findOne({ Email });
  if (user) {
    res.json({ message: "Email is already exist" });
  } else {
    bcrypt.hash(
      Password,
      Number(process.env.ROUND),
      async function (err, hash) {
        const newUser = await User.insertMany({
          User_name,
          Email,
          Password: hash,
          Phone,
        });
        res.json({ message: "Successfully added user", data: newUser });
      }
    );
  }
};
const SignIn = async (req, res) => {
  const { Email, Password } = req.body;
  let user = await User.findOne({ Email });
  if (user) {
    const match = await bcrypt.compare(Password, user.Password);
    if (match) {
      let token = generateToken({
        User_name: user.user_name,
        userId: user._id,
      });
      res.json({ message: "User is logged", token, data: user });
    } else {
      // password incorrect
      res.json({ message: "In correct password" });
    }
  } else {
    res.json({ message: "Account not found" });
  }
};
const addToCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tripId = req.query.tripId;
    const updatedCart = await User.updateOne(
      { _id: userId },
      { $push: { cart: tripId } }
    );
    res.status(200).json({
      success: true,
      message: "Successfully added to cart",
      updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't add to cart",
    });
  }
};
const addToFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tripId = req.query.tripId;
    const updatedFavorite = await User.updateOne(
      { _id: userId },
      { $push: { favorite: tripId } }
    );
    res.status(200).json({
      success: true,
      message: "Successfully added to favourites",
      updatedFavorite,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't add to favourite",
    });
  }
};
const deleteFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tripId = req.query.tripId;
    const totalQuantity = parseInt(req.query.totalQuantity);
    const totalPrice = parseInt(req.query.totalPrice);
    const newdata = await User.findByIdAndUpdate(
      userId,
      { totalPrice: totalPrice },
      { totalQuantity: totalQuantity }
    );
    // const tripQuantity = parseInt(req.query.ItemQuantity);
    const tripPrice = parseInt(req.query.ItemPrice);
    const availableSeats = parseInt(req.query.availableSeats);

    const newdata2 = await Tour.findByIdAndUpdate(tripId, {
      totalPrice: tripPrice,
      totalQuantity: 1,
      availableSeats: availableSeats,
      maxGroupSize: availableSeats,
    });
    const updatedCart = await User.updateOne(
      { _id: userId },
      { $pull: { cart: tripId } }
    );
    res.status(200).json({
      success: true,
      message: "Successfully deleted form cart",
      updatedCart,
      newdata,
      newdata2,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't delete",
    });
  }
};
const deleteFromFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tripId = req.query.tripId;
    const updatedCart = await User.updateOne(
      { _id: userId },
      { $pull: { favorite: tripId } }
    );
    res.status(200).json({
      success: true,
      message: "Successfully deleted from favourites",
      updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't delete",
    });
  }
};
const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await User.findById(userId)
      .populate({ path: "cart" })
      .select("cart");
    const cartDetails = await User.findById(userId);
    res.status(200).json({
      success: true,
      cart,
      cartDetails,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getUserFavorite = async (req, res) => {
  try {
    const userId = req.params.userId;
    const favorite = await User.findById(userId)
      .populate({ path: "favorite" })
      .select("favorite");

    res.status(200).json({
      success: true,
      favorite,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};
const ChangeQuantity = async (req, res) => {
  try {
    const userID = req.params.userID;
    const totalQuantity = parseInt(req.query.totalQuantity);
    const totalPrice = parseInt(req.query.totalPrice);
    const newdata = await User.findByIdAndUpdate(
      userID,
      { totalPrice: totalPrice },
      { totalQuantity: totalQuantity }
    );
    const tripID = req.params.tripID;
    const availableSeats = parseInt(req.query.availableSeats);
    const ItemPrice = parseInt(req.query.ItemPrice);
    const ItemQuanity = parseInt(req.query.ItemQuanity);
    const newdata2 = await Tour.findByIdAndUpdate(tripID, {
      maxGroupSize: availableSeats,
      totalQuantity: ItemQuanity,
      totalPrice: ItemPrice,
      availableSeats: availableSeats,
    });
    res.status(200).json({
      success: true,
      newdata,
      newdata2,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
    });
  }
};
const deleteCartAfterPay = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedcart = await User.findByIdAndUpdate(userId, {
      cart: [],
      totalPrice: 0,
      totalQuantity: 0,
    });

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      deletedcart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "can't delete",
    });
  }
};

export {
  SignUp,
  SignIn,
  addToCart,
  addToFavorite,
  deleteFromCart,
  deleteFromFavorite,
  getUserCart,
  getUserFavorite,
  ChangeQuantity,
  deleteCartAfterPay,
};
