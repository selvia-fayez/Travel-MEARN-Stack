import jwt from "jsonwebtoken";

export const generateToken = (PAYLOAD) => {
  let token = jwt.sign({ PAYLOAD },process.env.JWT_KEY);
  return token;
};
