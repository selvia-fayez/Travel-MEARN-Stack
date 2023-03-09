import mongoose from "mongoose";
const companySchema = new mongoose.Schema({
  Company_name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Phone: { type: String, required: true },
  Address: { type: String, required: true },
  CRN: { type: String, required: true },
  Password: { type: String, required: true },
  packageType: { type: String },
});
export default mongoose.model("Company", companySchema);
