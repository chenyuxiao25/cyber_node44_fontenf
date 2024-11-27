
import initModels from "../models/init-models.js"
import sequelize from "../models/connect.js";
import { Op } from "sequelize";//operator :toan tu LIKE  AND IN  OR

// import { where } from "sequelize";



const model = initModels(sequelize);

const getListVideo = async (req,res) => {
try {
 let  data = await model.video.findAll();
 return res.status(200).json(data)
} catch (error) {
    return res.status(500).json({message:"erros"})
}
}
const getType = async(req,res ) => {
  try {
    let data = await model.video_type.findAll();

 return res.status(200).json(data)
    
  } catch (error) {
    return res.status(500).json({message:"erros"})
}
}

const getListVideoType = async (req,res) => {
  try {
    let {typeId} = req.params;
    let data = await model.video.findAll(
        {
            where:{
                type_id : typeId,
            }
        }

    )   
    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:'erros'})
  }
}
const getVideoPage = async (req,res) => {
  try {
    let {page,size} = req.params;
    page = parseInt(page,10); //NAN : not a Number 

size  = parseInt(size,10);

if(isNaN(page) ||page <= 0 ){
  return res.status(400).json({message:"page is wrong"})
}

if(isNaN(page) ||size <= 0){
  return res.status(400).json({message:"page is wrong"})

}
let index = (page-1) * size ;
let data =  await model.video.findAll({
  offset:index,
  limit:size
})
return res.status(200).json(data)
  } catch (error) {
    return res.status(500).json({message:'erros'})
  }
}

export {
   getListVideo,
   getType,
   getListVideoType,
   getVideoPage,
}