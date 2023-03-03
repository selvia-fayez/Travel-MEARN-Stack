import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  User_name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
  Password: { type: String, required: true },
  cart: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
    default: [],
  },
  favorite: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tour" }],
    default: [],
  },
  totalQuantity: { type: Number },
  totalPrice: { type: Number },
});

export default mongoose.model("User", userSchema);
