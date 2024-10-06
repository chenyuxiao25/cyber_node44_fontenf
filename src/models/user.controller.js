import { INTERNAL_SEVER, OK } from "../../const.js";
import pool from "../../db.js";

const createUser = (req,res) => {
   let params = req.params;

   let{id,hoten} = params;
   let body = req.body;
res.send({
   id,
   hoten
})

  
}

const getUsers = async(req,res) => {

   try {
     const [data ] = await pool.query(`
         SELECT * FROM users
         LIMIT 1
         `)
     res.status(OK).json(data)
   }
    catch (error) {
     res.status(INTERNAL_SEVER).json({message:"error"})
   }
 }

 const deleteUser = async (req,res) => {
   try {
      const{user_id} = req.params;
      const [data] = await pool.query(`
      DELETE FROM users
       WHERE user_id = ${user_id}
      `);
      res.status(OK).json(data);

      
   } catch (error) {
      res.status(INTERNAL_SEVER).json({message:'errors'})
   }
   
 }
 
export{
   createUser,getUsers,deleteUser,
}