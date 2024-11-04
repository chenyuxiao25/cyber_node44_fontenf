
import sequelize from "../models/connect.js";


import initModels from "../models/init-models.js"
 

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
   pass_word:pass
})
      return res.status(200).json({message:'dang ky thanh cong',data:userNew})
    //kiem tra xem  email co ton tai hay chua
    //neu  ton tai tra loi tai khoan da ton tai
   //neu chua ton tai di tiep

   } catch (error) {
      return res.status(INTERNAL_SEVER).json({message:"error"})
   }
   
}


export {register,}