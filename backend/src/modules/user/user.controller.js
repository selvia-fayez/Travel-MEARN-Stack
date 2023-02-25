import User from "../../../models/User.js";
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
      message: "Successfully added user",
      updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "This Email has an account, try to sign in ",
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
      message: "Successfully added user",
      updatedFavorite,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "This Email has an account, try to sign in ",
    });
  }
};
const deleteFromCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tripId = req.query.tripId;
    const updatedCart = await User.updateOne(
      { _id: userId },
      { $pull: { cart: tripId } }
    );
    res.status(200).json({
      success: true,
      message: "Successfully added user",
      updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "This Email has an account, try to sign in ",
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
      message: "Successfully added user",
      updatedCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "This Email has an account, try to sign in ",
    });
  }
};
const getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await User.findById(userId)
      .populate({ path: "cart" })
      .select("cart");

    res.status(200).json({
      success: true,
      message: "Successfully added user",
      cart,
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
      message: "Successfully added user",
      favorite,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "This Email has an account, try to sign in ",
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
};
