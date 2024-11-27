
import { createToken } from "../config/jwt.js";
import { transporter } from "../config/transporter.js";
import sequelize from "../models/connect.js";


import initModels from "../models/init-models.js"
 import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const model = initModels(sequelize);



const register = async (req,res,next) => {
   try {


     const{fullName,email,pass}= req.body;

     console.log({fullName,email,pass})



     const userExits = await model.users.findOne(
      {
         where:{
            email:email
         }

      }
   )
console.log({userExits})

if(userExits){
   return res.status(400).json({message:"tai khoan da ton tai",data:null})
}

//them nguoi dung moi vaodb


 const userNew = await model.users.create({
   full_name:fullName,
   email:email,
   pass_word:bcrypt.hashSync(pass,10),
})

//cau hinh in info email 
const mailOptiiol ={
   from:"chenyuxiaoredux2gmail.com",
   to:email,
   subject :"wellcome to Our Service ",
   text:`hello ${fullName} ,${pass} bestRegest`,
   html :`<h1> ahihi do ngoc</h1>`
}

// tien hanh gui maikl 
transporter.sendMail(mailOptiiol,(erro,info) => {
 if(erro)
{
   return res.status(500).json({message:"sending email erro"});

}

return res.status(200).json(
   {
      message:"dang ky thanh cong",
      data:userNew


},
   
)
}
)
      return res.status(200).json({message:'dang ky thanh cong',data:userNew})
    //kiem tra xem  email co ton tai hay chua
    //neu  ton tai tra loi tai khoan da ton tai
   //neu chua ton tai di tiep

   } catch (error) {
      return res.status(INTERNAL_SEVER).json({message:"error"})
   }
   
}

const login = async (req,res)=>{
   try {
    
    
    
    
      //b1  lay email pass_word thong qua body request
    //B2:check user thong qua email (get user tu db );
// B2.1 neu khong co user => ra errors user not found
//B2,2 neu co user check tieop pass word 
//b2.3 neu  password khong trung  nhau =>erro password is wrong
//b2.4 neu password trung nhau=> tao acesstokent


let {email ,pass_word} = req.body;
let user = await model.users.findOne( {
   where:{
      email
   }
} )

if(!user){
   return res.status(400).json({message:"email is wrong"})
}
let checkPass  = bcrypt.compareSync(pass_word ,user.pass_word)
if(!checkPass){
   return res.status(400).json({message:"password is wrong"})
}      


let payload = {
   userId : user.user_id
}
// //tao tocken 
// //dung thu vien json web tocken npm i  jsonwebtoken
// //dung functon sign param 1  noi tao payload luu vao token
// //param 2 :key de tao token 
// //param 3:setting lifetime cua tocken va thuat toan  de ma hoa
// return res.status(400).json({me  ssage:"password is wrong22222"})
let acesstokent =createToken(payload)
return res.status(200).json({
   message:"login sucessfuly",
   data:acesstokent
 
})



} catch (error) {
      return res.status(500).json({message:"ERROR"})
      }
   
//    try {
//       let {email,pass_word} = req.body;
//       let user = await model.users.findOne({
//          where:{
//             email
//          }
//       })
//       return res.status(500).json({message:"error 111` "})  
   
// } catch (error) {
// }

}

const loginFacebook  = async (req,res) => {
  try {
   // lay id email  va name tu reques
   //b2 check id (app ,face_id trong db )
   //b2.1 neu co app_face_id =>tao acesstocken = gui ve fron end
   //b2.3 neu khong co app_face_is +> tao user moi  =>tao access tocken =>gui ve fe
   let {id ,email ,name} = req.body;
   let user = await model.users.findOne({
      where :{
         face_app_id :id
      }
   })

   if(!user) {
      let newUser  ={
         full_name:name,
         face_app_id:id,
         email
      }
      user = await model.users.create(newUser)
   }
   let acesstocken = jwt.sign({userId:user.user_id},"NODE44",
      {
      algorithm:"HS256",
      expiresIn:"1d"
      }
   )
   return res.status(200).json({
      message:"login succesfull",
      data:acesstocken
   })
  } catch (error) {
   console.log(error)
   return res.status(500).json({message:"error"})
  }
}


export {register,login,loginFacebook}