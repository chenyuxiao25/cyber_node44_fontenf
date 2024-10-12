import { INTERNAL_SEVER, OK } from "../../const.js";
import pool from "../../db.js";
import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js";
import { Op } from "sequelize";//operator :toan tu LIKE  AND IN  OR
// import { where } from "sequelize";



const model = initModels(sequelize);
const createUser = async(req,res) => {
//    let params = req.params;z

//    let{id,hoten} = params;
//    let body = req.body;
// res.send({
//    id,
//    hoten
// })


//lay data tu body request 
try {
   const {full_name,email,pass_word,avatar} =req.body;
let newUser = await model.users.create({
   full_name,
   email,
   pass_word,
   avatar,
})
return res.status(201).json(newUser);
} catch (error) {
   return res.status(INTERNAL_SEVER).json({message:"error"})
}


  
}

const getUsers = async(req,res) => {

   try {
   //   const [data ] = await pool.query(`
   //       SELECT * FROM users
   //       LIMIT 1
   //       `)
   let {full_name =""} =req.query ;
   // let full_name= req.query.full_name||'';
   let data = await model.users.findAll({
      where:{
      full_name:{
         [Op.like]:`%${full_name}%`
      }
      },
      attributes:["full_name","user_id"],
      include:[
         {
            model: model.video,//chon model muon ket bang
            as :'videos',
            attributes:['video_name','user_id'], //chi chinh model muon hien thi
         // required :true ,//default se ket bang theo left joint ,mmuon inner join dung requir
         
            include:[
            {
               model:model.video_comment,
               as :"video_comments"
            }
         ]
         }
      ]
//   include:[
//       {
//          // model: model.video,//chon model muon ket banfg
//          // as:"video"
//          // attributes:['video_name','user_id']
//       }
//    ]
   });
 
   res.status(OK).json(data)
   }
    catch (error) {
     res.status(INTERNAL_SEVER).json({message:"error"})
   }
 }

 const deleteUser = async (req,res) => {
   try {
      const{user_id} = req.params;

      // const [data] = await pool.query(`
      // DELETE FROM users
      //  WHERE user_id = ${user_id}
      // `);
      let user  = await model.users.findByPk(user_id)
      if(!user){
         return res.status(404).json({message:"user not found"})
      }
      user.destroy();
      return res.status(200).json({message:'user delete successlly!q  '})
      // res.status(OK).json(data);

      
   } catch (error) {
      return res.status(INTERNAL_SEVER).json({message:'errors'})
   }
   
 }
 

 const updateUser = async (req,res) => {
try {
   const{user_id} =req.params;
const {full_name,pass_word}= req.body;
//check data co ton tai trong db hay khong

let user = await model.users.findByPk(user_id)
// let user = await model.users.findOne({
//    where:{user_id}
// })

if(!user){
   return res.status(400).json({message:"user not found"})
}
let data = await model.users.update(

   {full_name,pass_word},
   {
      where:{user_id}
   }
)  
// dung chinh object user de update infor  user
// user.full_name = full_name ||user.full_name;
// user.pass_word = pass_word ||user.pass_word;
// await user.save()
return res.status(OK).json({message:"update successfully"})
} catch (error) {
   res.status(INTERNAL_SEVER).json({message:"errord"})
   
}
 }
 
export{
   createUser,getUsers,deleteUser,updateUser,
}