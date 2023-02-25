import jwt from 'jsonwebtoken'
export  const companyAuth=(req,res,next)=>{
    const token=req.header('token')
    console.log(token);
    jwt.verify(token, process.env.JWT_KEY, async function (err, decoded) {
        if (err) {
          res.json({ message: "error in token  or token not provided", err });
        } else {
          console.log(decoded);}
          req.companyId=decoded.companyId
          next()
        })
}