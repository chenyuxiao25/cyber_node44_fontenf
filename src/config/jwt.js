import jwt from "jsonwebtoken"
import dotennv from "dotenv"

//doc file env
dotennv.config();

//create function  createToken
export const createToken =(data) => {
  return jwt.sign({payload:data},process.env.ACCESS_TOKEN_KEY,{
   algorithm:"HS256",
   expiresIn:"2d"
  })
}



const verifyToken = (token) => {
   try {
       jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
       return true;
   } catch (error) {
       // không verify được token
       return false;
   }
}

// create middlware token
export const middlewareToken = (req, res, next) => {
   let {token} = req.headers;

   console.log("11111111111",token);
   let checkToken = verifyToken(token);
   if (checkToken){
       // nếu token hợp lệ => pass => qua router
       next();
   } else {
       return res.status(401).json({message: "Unauthorized"});
   }
}