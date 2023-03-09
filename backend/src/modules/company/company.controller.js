import Company from "../../../models/Company.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateTooken.js";

const SignUp = async (req, res) => {
  const { Company_name, Email, Password, Phone, Address, CRN, packageType } =
    req.body;
  const company = await Company.findOne({ Email });
  if (company) {
    res.json({ message: "Email is already exist" });
  } else {
    bcrypt.hash(
      Password,
      Number(process.env.ROUND),
      async function (err, hash) {
        const newCompany = await Company.insertMany({
          Company_name,
          Email,
          Password: hash,
          Phone,
          Address,
          CRN,
          packageType,
        });
        res.json({ message: "Successfully added Company", data: newCompany });
      }
    );
  }
};

const SignIn = async (req, res) => {
  const { Company_name, Password } = req.body;
  let company = await Company.findOne({ Company_name });
  if (company) {
    const match = await bcrypt.compare(Password, company.Password);
    if (match) {
      let token = generateToken({
        Company_name: company.Company_name,
        companyId: company._id,
      });
      res.json({ message: "Company is logged", token, data: company });
    } else {
      // password incorrect
      res.json({ message: "In correct password" });
    }
  } else {
    res.json({ message: "Account not found" });
  }
};
const getCompanyInfo = async (req, res, next) => {
  const { companyId } = req.params;
  const companyInfo = await Company.findById(companyId);
  res.status(200).json({
    companyInfo,
  });
};
const UpdatePackage = async (req, res) => {
  try {
    const companyId = req.params.companyId;
    const { packageType } = req.body;

    const company = await Company.findByIdAndUpdate(companyId, { packageType });
    res.status(200).json({
      success: true,
      company,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
export { SignUp, SignIn, getCompanyInfo, UpdatePackage };
